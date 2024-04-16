import { Dispatch } from 'redux'
import { LoginParamsType, authAPI } from '../../../api/auth-api'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { appAction } from '../../../app/app-slice'
import { todolistAction } from '../TodolistList/todolists-slice'
import { ResultCode } from '../../../types/ResultCode'
import { createAppAsyncThunk } from '../../../utils/create-app-async-thunk'

const login = createAppAsyncThunk<any, { data: LoginParamsType }>('login/auth', async (arg, thunkAPI) => {
  thunkAPI.dispatch(appAction.setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.login(arg.data)
    if (res.data.resultCode === ResultCode.success) {
      thunkAPI.dispatch(appAction.setAppStatus({ status: 'idle' }))
      return { isLoggedIn: true }
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  }
  catch (error) {
    handleServerNetworkError(error as { message: string }, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)

  }
})


const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggenIn: false,
  },
  reducers: {
    setIsLoggenIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggenIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggenIn = action.payload.isLoggedIn;
      })
  }
})
export const authReducer = slice.reducer
export const authAction = slice.actions
export const loginThunk = {login}


// thunks



export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(appAction.setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCode.success) {
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

