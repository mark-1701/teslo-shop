'use server';

import { auth } from '@/auth';
import type { Address, Size } from '@/src/interfaces';
import prisma from '@/src/lib/prisma';

type ProductToOrder = {
  productId: string;
  quantity: number;
  size: Size;
};

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    // Verificiar la sesión del usuario
    if (!userId)
      return {
        ok: false,
        message: 'No hay sesión de usuario.'
      };

    // Nota: recuerden que podemos llevar 2+ productos con el mismo ID

    // Obtener la información de los productos
    // Buscar todos los productos cuyo id esten dentro del productIds
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds.map(p => p.productId)
        }
      }
    });

    // Calcular los montons // Encabezado
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

    // Los totales de tax, subtotal y total
    const { subTotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const productDB = products.find(p => p.id === item.productId);
        if (!productDB) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = productDB.price * productQuantity;
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;
        return totals;
      },
      {
        subTotal: 0,
        tax: 0,
        total: 0
      }
    );

    // * Transacción
    const prismaTx = await prisma.$transaction(async tx => {
      // 1. Actualizar el stock de los productos

      // Arreglo de promesas
      const updatedproductsPromises = products.map(product => {
        // Acumular los valores
        const productQuantity = productIds
          .filter(p => p.productId === product.id) // solo toma los items actuales
          .reduce((acc, item) => item.quantity + acc, 0); // cuenta la cantidad el total del producto

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida.`);
        }

        return tx.product.update({
          where: {
            id: product.id
          },
          data: {
            // inStock: product.inStock - productQuantity // ! no hacer
            inStock: {
              decrement: productQuantity
            }
          }
        });
      });

      const updatedProducts = await Promise.all(updatedproductsPromises);

      // Verificar valores negativos en las existencias = no hay stock
      updatedProducts.forEach(product => {
        if (product.inStock < 0)
          throw new Error(`${product.title} no tiene inventario suficiente.`);
      });

      // 2. Crear la orden - Encabezado - Detalle
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          orderItems: {
            createMany: {
              data: productIds.map(p => ({
                // ? orderId se inserta automáticamente
                quantity: p.quantity,
                size: p.size,
                productId: p.productId, // ! revisar
                price:
                  products.find(product => product.id === p.productId)?.price ??
                  0
              }))
            }
          }
        }
      });

      // TODO: Validar, si el price es cero, lanzar error

      const { country, ...restAddress } = address;

      // 3. Crear la dirección de la orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id
        }
      });

      return {
        updatedProducts,
        order,
        orderAddress
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message
    };
  }
};

/**
 * ANOTACIONES IMPORTANTES!!!
 *
 * Los cálculos como la cantidad de productos que va a llevar el usuario no son
 * delicados. Solo es el número de productos que se va a llevar.
 *
 * productIds: [
 *  { nombre: 'Sudadera blanca', talla: 'X', cantidad: 2, precio 4 },
 *  { nombre: 'Sudadera blanca', talla: 'M', cantidad: 1, precio 4 },
 *  { nombre: 'Sudadera negra', talla: 'XXL', cantidad: 6, precio 10 }
 * ];
 *
 *
 * Estos datos si son delicados, por eso se consulta en la base de datos, de
 * esta busqueda se hacen los cáculos del monto que se va a cobrar, y los
 * productos que se van a entregar al usuario.
 *
 * products = [
 *  { nombre: 'Sudadera blanca', tallas: {XS,S,M,L,XL,XXL}, inStock: 7, precio 4 },
 *  { nombre: 'Sudadera Negra', tallas: {XS,S,M,L}, inStock: 17, precio 10 },
 * ];
 */
