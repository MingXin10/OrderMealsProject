import { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredAmount = +amountInputRef.current.value //string轉成number
    if (enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false)
      return
    }
    props.onAddToCart(enteredAmount)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        // Input因為是客製的component，ref不work，必須在Input.js裡面加上React.forwardRef
        ref={amountInputRef}
        label="數量"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+Add</button>
      {!amountIsValid && <p>請輸入1~5的數字</p>}
    </form>
  )
}

export default MealItemForm
