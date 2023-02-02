import styles from './Cart.module.css'
import CartItem from "./CartItem";
import Modal from "../UI/Modal";

const Cart = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <ul className={styles['cart-items']}><CartItem name="sushi" price={35.62} amount={1} /></ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={styles.actions}>
        <button onClick={() => props.onClose()} className={styles['button--alt']}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  )
}

export default Cart