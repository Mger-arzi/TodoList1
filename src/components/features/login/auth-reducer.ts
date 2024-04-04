import { Dispatch } from 'redux'
import { LoginParamsType, authAPI } from '../../../api/auth-api'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { appAction } from '../../../app/app-reducer'
import { todolistAction } from '../TodolistList/todolists-reducer'




const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggenIn: false,
  },
  reducers: {
    setIsLoggenIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggenIn = action.payload.isLoggedIn;
    },
  }
})
export const authReducer = slice.reducer
export const authAction = slice.actions



// thunks

export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
  dispatch(appAction.setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      dispatch(authAction.setIsLoggenIn({ isLoggedIn: true }))
      dispatch(appAction.setAppStatus({ status: 'idle' }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }
  catch (error) {
    handleServerNetworkError(error as { message: string }, dispatch)
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(appAction.setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(authAction.setIsLoggenIn({ isLoggedIn: false }))
      dispatch(appAction.setAppStatus({ status: 'idle' }))
      dispatch(todolistAction.clearDate())
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch)
  }
}

