import { appAction } from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolist-api'


type ErrorUtilsDispatchType = Dispatch

// generic function
export const handleServerAppError = <T,>(
    data: ResponseType<T>,
    dispatch: ErrorUtilsDispatchType
) => {
    if (data.messages.length) {
        dispatch(appAction.setAppError({error:data.messages[0]}))
    } else {
        dispatch(appAction.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appAction.setAppStatus({status: 'idle'}))
}

export const handleServerNetworkError = ( error: { message: string },dispatch: ErrorUtilsDispatchType) => {
    dispatch(appAction.setAppError({error: error.message}))
    dispatch(appAction.setAppStatus({status:'idle'}))
}