import { ICartProduct, ShippingAddress } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
  | { type: "Cart - Load cart from cookies | storage"; payload: ICartProduct[] }
  | { type: "[Cart] - Update Products in Cart"; payload: ICartProduct[] }
  | { type: "[Cart] - Change product quantity"; payload: ICartProduct }
  | { type: "[Cart] - Remove product in cart"; payload: ICartProduct }
  | { type: "[Cart] - Load address from cookies"; payload: ShippingAddress }
  | { type: "[Cart] - Update address"; payload: ShippingAddress }
  | {
      type: "[Cart] - Update cart summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | { type: "[Cart] - Order complete" };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - Load cart from cookies | storage":
      return { ...state, cart: action.payload, isLoaded: true };
    case "[Cart] - Update Products in Cart":
      return { ...state, cart: [...action.payload] };
    case "[Cart] - Load address from cookies":
    case "[Cart] - Update address":
      return { ...state, shippingAddress: action.payload };

    case "[Cart] - Change product quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          return action.payload;
        }),
      };
    case "[Cart] - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };
    case "[Cart] - Update cart summary":
      return {
        ...state,
        ...action.payload,
      };
    case "[Cart] - Order complete":
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      };

    default:
      return state;
  }
};
