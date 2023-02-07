import styles from './Cart.module.css'
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import Checkout from "../Checkout/Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const cartCtx = useContext(CartContext)
  const hasItems = cartCtx.cartItems.length > 0

  const cartItemAddHandler = (item) => {
    cartCtx.onAddItem({...item, amount: 1})
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.onRemoveItem(id)
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/orders.json`, {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.cartItems
      })
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const cartModalContent = (
    <>
      <ul className={styles['cart-items']}>
        {cartCtx.cartItems.map(cartItem => <CartItem onAdd={cartItemAddHandler.bind(null, cartItem)} onRemove={cartItemRemoveHandler.bind(null, cartItem.id)} key={cartItem.id} {...cartItem} />)}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={() => setIsCheckout(false)} />}
      {!isCheckout && <div className={styles.actions}>
        <button onClick={() => props.onClose()} className={styles['button--alt']}>Close</button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
      </div>}
    </>
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && <p>Sending order data...</p>}
      {!isSubmitting && didSubmit && <>
        <p>Order successfully placed!</p>
        <div className={styles.actions}>
          <button onClick={() => props.onClose()} className={styles['button--alt']}>Close</button>
        </div>
      </>}
    </Modal>
  )
}

export default Cart