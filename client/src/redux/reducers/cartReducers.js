import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      return {}
    case CART_REMOVE_ITEM:
      return {}
    case CART_CLEAR_ITEMS:
      return {}
    case CART_SAVE_SHIPPING_ADDRESS:
      return {}
    case CART_SAVE_PAYMENT_METHOD:
      return {}
    default:
      return state
  }
}
