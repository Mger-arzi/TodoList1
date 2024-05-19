import { LoginParamsType, authAPI } from 'api/auth-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { appAction } from 'app/app-slice'
import { todolistsActions } from '../TodolistList/todolists-slice'
import { ResultCode } from 'types/types'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'


const login = createAppAsyncThunk<{ isLoggedIn: boolean }, { data: LoginParamsType }>('auth/login', async (arg, thunkAPI) => {
  thunkAPI.dispatch(appAction.setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.login(arg.data)
    if (res.data.resultCode === ResultCode.success) {
      thunkAPI.dispatch(appAction.setAppStatus({ status: 'idle' }))
      let token = res.data.data.token
      localStorage.setItem("sn-token", token);
      initializeApp();
      return { isLoggedIn: true }
    } else {
      const isShowGlobalError = !res.data.fieldsErrors.length
      handleServerAppError(res.data, thunkAPI.dispatch, isShowGlobalError)

      return thunkAPI.rejectWithValue(res.data)
    }
  }
  catch (error) {
    handleServerNetworkError(error as { message: string }, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)
  }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/logout', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appAction.setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCode.success) {
      dispatch(appAction.setAppStatus({ status: 'idle' }))
      dispatch(todolistsActions.clearDate())
      return { isLoggedIn: false }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch)
    return rejectWithValue(null)
  }
})


const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/initialize', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === ResultCode.success) {
    }
    else {
      handleServerAppError(res.data, dispatch, false)
      return rejectWithValue(null)
    }
    return { isLoggedIn: true }
  }
  catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch)
    return rejectWithValue(null)
  }
  finally {
    dispatch(appAction.setAppInitialized({ isInitialized: true }))
  }
})

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher((action) => {
        if (
          action.type === "auth/login/fulfilled" ||
          action.type === "auth/logout/fulfilled" ||
          action.type === "auth/initializeApp/fulfilled"
        ) {
          return true
        }
        else {
          return false
        }
      }, (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })


  }
})
export const authReducer = slice.reducer
export const authAction = slice.actions
export const authThunks = { login, logout, initializeApp }



