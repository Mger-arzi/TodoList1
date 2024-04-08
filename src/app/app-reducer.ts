import { Dispatch } from "redux"
import { authAPI } from "../api/auth-api"
import { handleServerNetworkError } from "../utils/error-utils"
import { authAction, authReducer } from './../components/features/login/auth-reducer';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { error } from 'console';

export type RequestStatusType = 'idle' |  'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>




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
    setInitializeApp(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    }
  }

})
export const appAction = slice.actions
export const appReducer = slice.reducer




export const initializeAppTC = () => (dispatch: Dispatch) => {
  debugger
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(authAction.setIsLoggenIn({ isLoggedIn: true }))
    } else {
      debugger
    }
    dispatch(appAction.setInitializeApp({ isInitialized: true }))
  })
}