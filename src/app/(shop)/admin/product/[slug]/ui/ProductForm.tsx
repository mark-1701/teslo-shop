'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { createUpdateProduct, deleteProductImage } from '@/src/actions';
import { ProductImage as ProductWithImage } from '@/src/app/generated/prisma/client';
import { ProductImage } from '@/src/components';
import { Category, Product } from '@/src/interfaces';

interface Props {
  product: Partial<Product> & {
    productImages?: ProductWithImage[];
  };
  categories: Category[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

type FormInputs = {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string; // camisa, t-shirt
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;
  images?: FileList;
};

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],
      images: undefined // ! necesario inicializar
      // de todos modos al envíar el submit si se respeta el tipado que indica
      // que esa propiedad es opcional
    }
  });

  watch('sizes'); // ! re-renderizar si los sizes cambian

  const onSizeChanged = (size: string) => {
    const sizes = getValues('sizes');
    // sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    // toggle de etiquetas
    const isPresent = sizes.includes(size);
    const newSizes = isPresent
      ? sizes.filter(s => s !== size) // Eliminar
      : [...sizes, size]; // Agregar

    setValue('sizes', newSizes);
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { images, ...productToSave } = data;

    if (!productToSave.sizes.toString()) return; // todo: agregar este error al hook form
    if (product.id) formData.append('id', product.id ?? '');
    formData.append('title', data.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags.toString());
    formData.append('categoryId', productToSave.categoryId.toString());
    formData.append('gender', productToSave.gender);

    if (images) {
      // recorrer objeto, acceder a todas las imágenes que tiene y agregarlas
      // al formData
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert('Producto no se pudo actualizar');
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form
      className="mb-16 grid grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Textos */}
      <div className="w-full">
        <div className="mb-2 flex flex-col">
          <span>Título</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register('title', { required: true })}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Slug</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register('slug', { required: true })}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="rounded-md border bg-gray-200 p-2"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="mb-2 flex flex-col">
          <span>Price</span>
          <input
            type="number"
            className="rounded-md border bg-gray-200 p-2"
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Tags</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register('tags', { required: true })}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Gender</span>
          <select
            className="rounded-md border bg-gray-200 p-2"
            {...register('gender', { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="mb-2 flex flex-col">
          <span>Categoria</span>
          <select
            className="rounded-md border bg-gray-200 p-2"
            {...register('categoryId', { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="mb-2 flex flex-col">
          <span>Inventario</span>
          <input
            type="number"
            className="rounded-md border bg-gray-200 p-2"
            {...register('inStock', { required: true, min: 0 })}
          />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map(size => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                className={clsx(
                  `mr-2 mb-2 w-14 cursor-pointer rounded-md border p-2
                  text-center transition-all`,
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size)
                  }
                )}
                onClick={() => onSizeChanged(size)}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="mb-2 flex flex-col">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="rounded-md border bg-gray-200 p-2"
              accept="image/png, image/jpeg, image/jpg, image/avif"
              {...register('images')}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {product.productImages?.map(image => (
              <div key={image.id}>
                <ProductImage
                  alt={product.title ?? ''}
                  src={image.url}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />
                <button
                  type="button"
                  className="btn-danger w-full rounded-b-3xl"
                  onClick={() => deleteProductImage(image.id, image.url)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
