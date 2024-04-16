import { Dispatch } from "redux"
import { authAPI } from "../api/auth-api"
import { authAction } from '../components/features/login/auth-slice';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResultCode } from "../types/ResultCode";
import { createAppAsyncThunk } from "../utils/create-app-async-thunk";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>


// const initializeApp = createAppAsyncThunk<{ isInitialized: boolean }, undefined>('initialize/app', async (_, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI
//   try {
//     // dispatch(appAction.setAppStatus({ status: 'loading' }))
//     const res = await authAPI.me()
//     if (res.data.resultCode === ResultCode.success) {
//       dispatch(authAction.setIsLoggenIn({ isLoggedIn: true }))
      
//     } else {
//       handleServerAppError(res.data, dispatch)
//       return rejectWithValue(null)
//     }
//     return { isInitialized: true }
//   }
//   catch (e) {
//     handleServerNetworkError(e as { message: string }, dispatch)
//     return rejectWithValue(null)
//   }
// })


const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
  },
  reducers: {
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    }
  }

})
export const appAction = slice.actions
export const appReducer = slice.reducer




