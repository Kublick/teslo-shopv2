import { CartProduct } from "@/intefaces/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product) => {
        const { cart } = get();

        // Revisar si existe el producto con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size,
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        // Si existe, actualizar la cantidad
        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
        set({ cart: updateCartProducts });
      },
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0,
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },
      updateProductQuantity: (product, quantity) => {
        const { cart } = get();
        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ cart: updateCartProducts });
      },
      removeProduct: (product) => {
        const { cart } = get();
        const updateCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size,
        );
        set({ cart: updateCartProducts });
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),

    {
      name: "shopping-cart",
    },
  ),
);
