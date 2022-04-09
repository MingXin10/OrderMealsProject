import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
    //購物車有同樣類型商品做集中
    const existingCartItemIndex = state.items.findIndex(
      //找不到--→i===-1
      (item) => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex] //找不到會拿到undefined
    let updatedItems
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
    const existingItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingItem.price //一次刪除一個，所以是目前總價扣除單價
    let updatedItems
    if (existingItem.amount === 1) {
      //只剩一個就移出購物車
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCartState
  }
  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item })
  }
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id })
  }

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  }
  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider
