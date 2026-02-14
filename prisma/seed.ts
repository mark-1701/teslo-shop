import prisma from '@/src/lib/prisma';
import { initialData } from '@/prisma/data/initial-data';

const main = async () => {
  const { users, categories, products, countries } = initialData;

  // Borrar registros previos
  await Promise.all([]);
  (await prisma.orderAddress.deleteMany(),
    await prisma.orderItems.deleteMany(),
    await prisma.order.deleteMany(),
    await prisma.userAddress.deleteMany(),
    await prisma.user.deleteMany(),
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany(),
    await prisma.country.deleteMany());

  // Usuarios
  await prisma.user.createMany({
    data: users
  });

  // Categorias
  const categoriesData = categories.map(name => ({
    name
  }));
  await prisma.category.createMany({
    data: categoriesData
  });

  // Moldear las categorías
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name] = category.id;
      return map;
    },
    {} as Record<string, string> // <string=shirt, categoryId>
  );

  // Productos
  products.forEach(async product => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    });

    // Images
    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }));
    await prisma.productImage.createMany({
      data: imagesData
    });
  });
  
  // Paises
  await prisma.country.createMany({
    data: countries
  });
};

main();
