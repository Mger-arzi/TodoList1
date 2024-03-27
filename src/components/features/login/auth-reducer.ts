import { Dispatch } from 'redux'
import { SetAppErrorACType, SetAppStatusACType, setAppStatusAC } from '../../../app/app-reducer'
import { LoginParamsType, authAPI } from '../../../api/auth-api'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils'

const initialState = {
  isLoggenIn: false,
}
type InitialStateType = typeof initialState
export const authReducer = (state: InitialStateType = initialState,  action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggenIn: action.value }
    default:
      return state
  }
}
// actions
export const setIsLoggenInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value }) as const

  
// thunks

export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  try{
    const res = await authAPI.login(data)
      if(res.data.resultCode === 0){
          dispatch(setIsLoggenInAC(true))
          dispatch(setAppStatusAC('idle'))
      }else{
      handleServerAppError(res.data, dispatch)
      }
  }
  catch(error){
    handleServerNetworkError(error as { message: string }, dispatch)
}
}



// types
type ActionsType =
  | ReturnType<typeof setIsLoggenInAC>
  | SetAppStatusACType
  | SetAppErrorACType