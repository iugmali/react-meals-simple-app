import React, {useEffect, useState} from "react";

const CartContext = React.createContext({
  cartItems: [],
  totalAmount: 0,
  onAddItem: (item) => {},
  onRemoveItem: (id) => {}
})

export const CartContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([])
  const totalAmount = 0

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('react_meals_cart_items')))
  }, [])

  const addItemHandler = (item) => {
    //TODO
    return
  }

  const removeItemHandler = (id) => {
    //TODO
    return
  }

  return (
    <CartContext.Provider value={{
      cartItems: cartItems,
      totalAmount: totalAmount,
      onAddItem: addItemHandler,
      onRemoveItem: removeItemHandler
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext