import {DUMMY_MEALS} from "../../data/dummy-meals";
import styles from './AvailableMeals.module.css'
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = (props) => {
  return (
    <Card className={styles.meals}>
      <ul>
        {DUMMY_MEALS.map(meal => <MealItem key={meal.id} {...meal} />)}
      </ul>
    </Card>
  )
}

export default AvailableMeals