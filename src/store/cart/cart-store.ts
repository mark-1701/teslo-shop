import { CartProduct } from '@/src/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProducttoCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
};

export const useCartStore = create<State>()(
  // ? Persistencia
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        return {
          subTotal,
          tax,
          total,
          itemsInCart
        };
      },

      addProducttoCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        // retorna booleado si al menos un elemento cumple con la condición
        const productInCart = cart.some(
          item => item.id === product.id && item.size === product.size
        );

        // Agregar el producto nuevo
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Se que el producto existe por talla... tengo que incrementar
        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            // retornar un nuevo objeto con nuevo quantity
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity }
            : item
        );
        set({ cart: updatedCartProducts });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          item => item.id !== product.id || item.size !== product.size
        );
        set({ cart: updatedCartProducts });
      },
      clearCart: () => {
        set({ cart: [] });
      }
    }),
    {
      name: 'shopping-cart',
      skipHydration: true
    }
  )
);
