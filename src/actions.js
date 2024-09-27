import { ADD_TO_CART, CHANGE_QUANTITY } from "./actionTypes";

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    item
  };
}

export function changeQuantity(item) {
  return {
    type: CHANGE_QUANTITY,
    item
  };
}