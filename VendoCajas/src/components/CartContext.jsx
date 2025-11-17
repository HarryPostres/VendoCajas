import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext()

const initialState = {
  items: []
};

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD":
      const exists = state.items.find(item => item.id === action.product.id);

      if (exists) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.product.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.product, cantidad: 1 }]
      };

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };

    case "CLEAR":
      return { items: [] };

    case "DECREMENT":
      const target = state.items.find(item => item.id === action.id);

      if (!target) return state;

      if (target.cantidad === 1) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.id)
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: "ADD", product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", id });
  const clearCart = () => dispatch({ type: "CLEAR" });
  const decrement = (id) => dispatch({ type: "DECREMENT", id })

  return (
    <CartContext.Provider
      value=
      {{
        items: state.items,
        addToCart,
        removeFromCart,
        clearCart,
        decrement
      }} >
      {children}
    </CartContext.Provider>
  );

}

export function useCart() {
  return useContext(CartContext);
}
