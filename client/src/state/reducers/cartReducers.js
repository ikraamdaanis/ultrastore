import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_UPDATE_PRICES,
} from '../constants/cartConstants'

export const cartReducer = (
  state = {
    cartItems: [],
    shippingAddress: {},
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  { type, payload }
) => {
  switch (type) {
    case CART_ADD_ITEM: {
      const item = payload
      const itemExists = state.cartItems.find(cartItem => cartItem.product === item.product)
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(cartItem =>
            cartItem.product === itemExists.product ? item : cartItem
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    }
    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.product !== payload),
      }
    }
    case CART_UPDATE_PRICES: {
      return {
        ...state,
        ...payload,
      }
    }
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: payload }
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
      }
    default:
      return state
  }
}
