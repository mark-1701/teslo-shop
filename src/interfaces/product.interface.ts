export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  // TODO type: ValidTypes;
  gender: ValidGender;
}

export type CartProduct = {
  id: string;
  slug: string; // para regresar a la página del producto
  title: string;
  price: number;
  quantity: number;
  size: ValidSizes;
  image: string;
};

export type ValidGender = 'men' | 'women' | 'kid' | 'unisex';
export type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
