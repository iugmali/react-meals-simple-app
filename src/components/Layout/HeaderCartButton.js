import styles from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [buttonHighlighted, setButtonHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)
  const numberOfCartItems = cartCtx.cartItems.reduce((curNumber, item) => {
    return curNumber + item.amount
  },0)
  const {cartItems} = cartCtx

  useEffect(() => {
    if (cartItems.length === 0) {
      return
    }
    setButtonHighlighted(true)
    const timer = setTimeout(() => setButtonHighlighted(false), 300)
    return () => {
      clearTimeout(timer)
    }
  }, [cartItems])

  return (
    <button className={`${styles.button} ${buttonHighlighted ? styles.bump : ''}`} onClick={() => props.onShowCart()}>
      <span className={styles.icon}><CartIcon /></span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton