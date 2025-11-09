
import { createContext, useContext, useReducer } from 'react';  


const CartContext = createContext()

const initialState = {
  items:[]
};


function cartReducer(state, action){
  switch (action.type){
    case "ADD":
      const exists = state.items.find(item => item.id === action.product.id);

      if (exists){
        return{
          ...state,
          items: state.items.map(item =>
            item.id === action.product.id
            ? {...item, cantidad: item.cantidad + 1}
            :item
          )
        };
      }
      return{
        ...state,
        items:[...state.items, {...action.product,cantidad: 1 }]
      };

    case "REMOVE":
      return{
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    
      case "CLEAR":
        return{ items: [] };

      default: 
        return state;
  }
}

export function CartProvider({ children }){
  const [state, dispach] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispach ({type: "ADD", product});
  const removeFromCart = (id) => dispach({type:"REMOVE", id});
  const clearCart = () => dispach({type: "CLEAR"});

  return (
    <CartContext.Provider value = {{items: state.items, addToCart, removeFromCart, clearCart}} >
      {children}
    </CartContext.Provider>
  );

}
  
export function useCart() {
  return useContext(CartContext);
}
