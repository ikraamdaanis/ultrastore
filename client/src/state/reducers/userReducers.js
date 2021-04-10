import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
} from '../constants/userConstants'

const userLoginDefaultState = { userInfo: null, error: null }
export const userLoginReducer = (state = userLoginDefaultState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload }
    case USER_LOGOUT:
      return userLoginDefaultState
    default:
      return state
  }
}

const userRegisterDefaultState = { userInfo: null, error: null }
export const userRegisterReducer = (state = userRegisterDefaultState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: payload }
    case USER_LOGOUT:
      return userRegisterDefaultState
    default:
      return state
  }
}

const userDetailsDefaultState = { loading: true, user: null, error: null }
export const userDetailsReducer = (state = userDetailsDefaultState, { type, payload }) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: payload }
    case USER_DETAILS_RESET:
      return userDetailsDefaultState
    default:
      return state
  }
}

const userUpdateProfileDefaultState = { loading: true, success: false, error: null }
export const userUpdateProfileReducer = (
  state = userUpdateProfileDefaultState,
  { type, payload }
) => {
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: payload }
    case USER_UPDATE_PROFILE_RESET:
      return userUpdateProfileDefaultState
    default:
      return state
  }
}

const userListDefaultState = { loading: true, users: [], error: null }
export const userListReducer = (state = userListDefaultState, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: payload }
    case USER_LIST_FAIL:
      return { loading: false, error: payload }
    case USER_LIST_RESET:
      return userListDefaultState
    default:
      return state
  }
}

const userUpdateDefaultState = { loading: true, success: false, error: null }
export const userUpdateReducer = (state = userUpdateDefaultState, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: payload }
    case USER_UPDATE_RESET:
      return userUpdateDefaultState
    default:
      return state
  }
}

const userDeleteDefaultState = { loading: true, success: false, error: null }
export const userDeleteReducer = (state = userDeleteDefaultState, { type, payload }) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: payload }
    case USER_DELETE_RESET:
      return userDeleteDefaultState
    default:
      return state
  }
}
