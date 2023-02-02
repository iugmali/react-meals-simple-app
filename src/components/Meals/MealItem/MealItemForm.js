import styles from './MealItemForm.module.css'
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const submitHandler = () => {

  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input label="Amount" input={{id: 'amount', type: 'number', min: '1', max: '5', step: '1', defaultValue: '1'}} />
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm