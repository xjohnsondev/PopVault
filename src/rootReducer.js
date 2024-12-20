import { ADD_TO_CART, CHANGE_QUANTITY, REMOVE_ITEM, CLEAR_CART } from "./actionTypes";

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
                // Create new object of new item being added to cart
                const newItem = {
                    id: itemId,
                    name: action.item.name,
                    description: action.item.description,
                    price: action.item.price,
                    quantity: 1,
                    image: action.item.images[0],
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
            const id = action.item.id;
            const selectedItemIndex = state.items.findIndex(item => item.id === id);

            let updatedQtyItems;
            if (selectedItemIndex >= 0) {
                updatedQtyItems = state.items.map((item, index) =>
                    index === selectedItemIndex
                        ? {
                            ...item,
                            quantity: action.actionType === 'increment'
                                ? item.quantity + 1
                                : Math.max(1, item.quantity - 1)
                        }
                        : item
                );
            } else {
                updatedQtyItems = [...state.items];
            }

            // Update sessionStorage
            sessionStorage.setItem("cartItems", JSON.stringify(updatedQtyItems));

            return {
                ...state,
                items: updatedQtyItems,
            };
        case REMOVE_ITEM:
            const removeId = action.item.id;
            const updatedRemoveItems = state.items.filter(item => item.id !== removeId);

            // Update sessionStorage
            sessionStorage.setItem("cartItems", JSON.stringify(updatedRemoveItems));

            return {
                ...state,
                items: updatedRemoveItems
            };
        case CLEAR_CART:
            sessionStorage.setItem("cartItems", JSON.stringify([]));
            return {
                ...state,
                items: [],
            }
        default:
            return state;
    }
}

export default rootReducer;