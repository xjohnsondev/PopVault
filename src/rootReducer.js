import { ADD_TO_CART, CHANGE_QUANTITY } from "./actionTypes";

const INITIAL_STATE = {
    // Make sure `items` is always initialized as an array
    items: JSON.parse(sessionStorage.getItem("cartItems")) || [],
};

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_TO_CART:
            const itemId = action.item.id;
            const existingItemIndex = state.items.findIndex(item => item.id === itemId);

            let updatedItems;
            if (existingItemIndex >= 0) {
                updatedItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                const newItem = {
                    name: action.item.name,
                    id: itemId,
                    price: action.item.price,
                    quantity: 1,
                }
                updatedItems = [...state.items, newItem];
            }

            // Update sessionStorage
            sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));

            return {
                ...state,
                items: updatedItems,
            };
        case CHANGE_QUANTITY:
            return
        default:
            return state;
    }
}

export default rootReducer;