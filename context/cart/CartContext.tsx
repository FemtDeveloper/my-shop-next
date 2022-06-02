import { createContext } from "react";
import { ICartProduct } from "../../interfaces";

export interface contextProps {
  cart: ICartProduct[];
}

export const CartContext = createContext({} as contextProps);
