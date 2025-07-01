// 📄 ecommerce-client/src/context/CartContext.js

import React, { createContext, useContext, useReducer } from "react";

// 🛒 Initial state
const initialState = {
  cartItems: [],
};

// 🛠 Reducer to manage cart actions
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if item already exists
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex !== -1) {
        // If exists, update quantity
        const updatedItems = [...state.cartItems];
        updatedItems[existingIndex].quantity =
          (updatedItems[existingIndex].quantity || 1) + 1;
        return { ...state, cartItems: updatedItems };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };

    default:
      return state;
  }
}

// 💡 Create context
const CartContext = createContext();

// 🔁 Provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// 🧠 Custom hook to use context
export function useCart() {
  return useContext(CartContext);
}
