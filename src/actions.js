import { ADD_TO_CART, CHANGE_QUANTITY, REMOVE_ITEM, CLEAR_CART } from "./actionTypes";

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    item
  };
}

export function changeQuantity(item, actionType) {
  return {
    type: CHANGE_QUANTITY,
    item,
    actionType,
  };
}

export function removeItem(item) {
  return {
    type: REMOVE_ITEM,
    item
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART
  }
}