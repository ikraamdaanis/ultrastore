import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
  PRODUCT_LIST_ADMIN_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        pages: payload.pages,
        page: payload.page,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productListAdminReducer = (
  state = { loading: true, products: [] },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_LIST_ADMIN_REQUEST:
      return { loading: true }
    case PRODUCT_LIST_ADMIN_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        pages: payload.pages,
        page: payload.page,
      }
    case PRODUCT_LIST_ADMIN_FAIL:
      return { loading: false, error: payload }
    case PRODUCT_LIST_ADMIN_RESET:
      return { loading: true, products: [] }
    default:
      return state
  }
}

const productDetailsDefaultState = { loading: true, product: { reviews: [] } }
export const productDetailsReducer = (state = productDetailsDefaultState, { type, payload }) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: payload }
    case PRODUCT_DETAILS_RESET:
      return productDetailsDefaultState
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, { type, payload }) => {
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: payload }
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload }
    case PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload }
    case PRODUCT_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const productCreateReviewReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
