import {DUMMY_MEALS} from "../../data/dummy-meals";
import styles from './AvailableMeals.module.css'
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import {useEffect, useState} from "react";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/meals.json`)
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json()

      const loadedMeals = []
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }
    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })

  }, [])

  return (
    <Card className={styles.meals}>
      {isLoading && <p className={styles.meals__loading}>Loading...</p>}
      {httpError && <p className={styles.meals__error}>{httpError}</p>}
      {!isLoading && meals.length === 0 && <p>No meals yet. Wait for a meal to be added.</p>}
      {!isLoading && meals.length > 0 && <ul>{meals.map(meal => <MealItem key={meal.id} {...meal} />)}</ul>}
    </Card>
  )
}

export default AvailableMeals