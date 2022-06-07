import { createContext } from "react";
import { ICartProduct } from "../../interfaces";

export interface contextProps {
  isLoaded: boolean;

  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as contextProps);
