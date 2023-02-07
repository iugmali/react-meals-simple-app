import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const isEmpty = val => val.trim() === ''
const isNotFiveChars = val => val.trim().length !== 5


const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  })

  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalInputRef = useRef()
  const cityInputRef = useRef()

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode)
    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid
    if (!formIsValid) {
      setFormValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
      })
      return
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalInputRef} type='text' id='postal' />
        {!formValidity.postalCode && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
