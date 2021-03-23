import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_UPDATE_PRICES,
} from '../constants/cartConstants'

const saveCartToLocalStorage = (name, data) => localStorage.setItem(name, JSON.stringify(data))

const updateTotalPrices = () => async (dispatch, getState) => {
  const { cartItems } = getState().cart

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  const shippingPrice = itemsPrice > 100 ? 0 : 20
  const taxPrice = itemsPrice * 0.2
  const totalPrice = itemsPrice + shippingPrice + taxPrice

  dispatch({
    type: CART_UPDATE_PRICES,
    payload: { itemsPrice, shippingPrice, taxPrice, totalPrice },
  })

  saveCartToLocalStorage('cart', getState().cart)
}

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  dispatch(updateTotalPrices())
}

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  dispatch(updateTotalPrices())
}

export const saveShippingAddress = data => async dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  dispatch(updateTotalPrices())
}

export const savePaymentMethod = data => async dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  dispatch(updateTotalPrices())
}
