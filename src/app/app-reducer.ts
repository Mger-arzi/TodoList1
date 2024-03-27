import { Dispatch } from "redux"
import { authAPI } from "../api/auth-api"
import { setIsLoggenInAC } from "../components/features/login/auth-reducer"
import { handleServerNetworkError } from "../utils/error-utils"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'login/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.value }
    default:
      return state
  }
}

export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setInitializeAppAC = (value: boolean) => ({ type: 'login/SET-IS-INITIALIZED', value }) as const


export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggenInAC(true))
      dispatch(setInitializeAppAC(true))
    } else {
    }
    dispatch(setInitializeAppAC(true))
  })
}
export type SetAppStatusACType = ReturnType<typeof setAppErrorAC>
export type SetAppErrorACType = ReturnType<typeof setAppStatusAC>

type ActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC> | ReturnType<typeof setInitializeAppAC>