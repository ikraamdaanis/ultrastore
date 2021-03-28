import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_RESET,
  ORDER_USER_REQUEST,
  ORDER_USER_SUCCESS,
  ORDER_USER_FAIL,
  ORDER_USER_RESET,
  ORDER_ALL_USERS_REQUEST,
  ORDER_ALL_USERS_SUCCESS,
  ORDER_ALL_USERS_FAIL,
  ORDER_ALL_USERS_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = { loading: true }, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        success: false,
        error: payload,
      }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  { type, payload }
) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ORDER_DETAILS_RESET:
      return {
        loading: true,
        orderItems: [],
        shippingAddress: {},
      }
    default:
      return state
  }
}

export const orderDeliverReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

const orderUserDefaultState = { loading: true, orders: [], error: null }
export const orderUserReducer = (state = orderUserDefaultState, { type, payload }) => {
  switch (type) {
    case ORDER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      }
    case ORDER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        orders: [],
      }
    case ORDER_USER_RESET:
      return orderUserDefaultState
    default:
      return state
  }
}

export const orderAllUsersReducer = (state = { loading: true, orders: [] }, { type, payload }) => {
  switch (type) {
    case ORDER_ALL_USERS_REQUEST:
      return {
        loading: true,
      }
    case ORDER_ALL_USERS_SUCCESS:
      return {
        loading: false,
        orders: payload,
      }
    case ORDER_ALL_USERS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ORDER_ALL_USERS_RESET:
      return { loading: true, orders: [] }
    default:
      return state
  }
}
