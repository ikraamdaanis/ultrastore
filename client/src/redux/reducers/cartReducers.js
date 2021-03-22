import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
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
