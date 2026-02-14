'use server';

import { Product } from '@/src/app/generated/prisma/client';
import { Gender, Size } from '@/src/app/generated/prisma/enums';
import prisma from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true
});

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(2))), // ! parseo
  inStock: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform(val => val.split(',')),
  tags: z.string(), // ! podemos transformarlo igual que sizes
  // la diferencia es que viene de un input:text, después hacemos el split(', ')
  // Tranquilamente podemos tranformarlo en esta instancia. Es cuestión de gustos.
  gender: z.nativeEnum(Gender) // ! enumerable
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return { ok: false };
  }

  const product = productParsed.data;
  // minúsculas, reemplaa espacios en blanco con guiones
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async tx => {
      let product: Product;
      const tagsArray = rest.tags
        .split(',')
        .map(tag => tag.trim().toLowerCase());

      if (id) {
        // Actualizar
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        });
      } else {
        // Crear
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        });
      }

      // Proceso de carga y guardado de imágenes
      // Recorrer las imágenes y guardarlas
      if (formData.getAll('images')) {
        // [https://url-1.jpg, https://url-2.jpg]
        const images = await uploadImages(formData.getAll('images') as File[]);
        if (!images) {
          throw new Error('No se puedo cargar las imágenes, rollingback');
        }

        // Guardar las imágenes en productImage
        await prisma.productImage.createMany({
          data: images.map(image => ({
            url: image!,
            productId: product.id
          }))
        });
      }

      return {
        product
      };
    });

    // Revalidate paths
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar'
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async image => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then(resp => resp.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    return null;
  }
};
