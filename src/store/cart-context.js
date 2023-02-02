import React, {useEffect, useReducer} from "react";

const CartContext = React.createContext({
  cartItems: [],
  totalAmount: 0,
  onAddItem: (item) => {},
  onRemoveItem: (id) => {}
})

const defaultCartState = {
  cartItems: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
    const existingCartItemIndex = state.cartItems.findIndex(item => item.id === action.item.id)
    const existingCartItem = state.cartItems[existingCartItemIndex]
    let updatedItems
    if (existingCartItem) {
      let updatedItem
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.cartItems]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.cartItems.concat(action.item)
    }
    const cartState = {cartItems: updatedItems, totalAmount: updatedTotalAmount}
    localStorage.setItem('react_meals_cart', JSON.stringify(cartState))
    return cartState
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.cartItems.findIndex(item => item.id === action.id)
    const existingItem = state.cartItems[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingItem.price
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.cartItems.filter(item => item.id !== action.id)
    } else {
      let updatedItem = {...existingItem, amount: existingItem.amount - 1}
      updatedItems = [...state.cartItems]
      updatedItems[existingCartItemIndex] = updatedItem
    }
    const cartState = {cartItems: updatedItems, totalAmount: updatedTotalAmount}
    localStorage.setItem('react_meals_cart', JSON.stringify(cartState))
    return cartState
  }
  if (action.type === 'RETRIEVE') {
    return action.cartState
  }
  return defaultCartState
}

export const CartContextProvider = ({children}) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  useEffect(() => {
    if (localStorage.getItem('react_meals_cart')) dispatchCartAction({type: 'RETRIEVE', cartState: JSON.parse(localStorage.getItem('react_meals_cart'))})
  }, [])

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item})
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id})
  }

  return (
    <CartContext.Provider value={{
      cartItems: cartState.cartItems,
      totalAmount: cartState.totalAmount,
      onAddItem: addItemToCartHandler,
      onRemoveItem: removeItemFromCartHandler
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext