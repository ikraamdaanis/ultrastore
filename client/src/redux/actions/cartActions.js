import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

const saveCartToLocalStorage = (name, data) => localStorage.setItem(name, JSON.stringify(data))

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

  saveCartToLocalStorage('cartItems', getState().cart.cartItems)
}

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  saveCartToLocalStorage('cartItems', getState().cart.cartItems)
}

export const saveShippingAddress = data => async dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  saveCartToLocalStorage('shippingAddress', data)
}

export const savePaymentMethod = id => async (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: id,
  })
}
