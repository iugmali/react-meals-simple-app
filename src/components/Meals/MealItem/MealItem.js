import styles from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

const MealItem = ({id, name, description, price}) => {
  const cartCtx = useContext(CartContext)
  const addToCartHandler = (amount) => {
    cartCtx.onAddItem({id, name, description, price, amount})
  }
  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>${price.toFixed(2)}</div>
      </div>
      <div><MealItemForm onAddtoCart={addToCartHandler}/></div>
    </li>
  )
}

export default MealItem