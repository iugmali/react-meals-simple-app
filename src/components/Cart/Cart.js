import styles from './Cart.module.css'
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import {useContext} from "react";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const hasItems = cartCtx.cartItems.length > 0

  const cartItemAddHandler = (item) => {
    cartCtx.onAddItem({...item, amount: 1})
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.onRemoveItem(id)
  }

  return (
    <Modal onClose={props.onClose}>
      <ul className={styles['cart-items']}>
        {cartCtx.cartItems.map(cartItem => <CartItem onAdd={cartItemAddHandler.bind(null, cartItem)} onRemove={cartItemRemoveHandler.bind(null, cartItem.id)} key={cartItem.id} {...cartItem} />)}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={() => props.onClose()} className={styles['button--alt']}>Close</button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart