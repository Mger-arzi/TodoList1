import { appAction } from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolist-api'
import { AppDispatch } from '../app/store';
import axios from 'axios';


type ErrorUtilsDispatchType = Dispatch

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

// export const handleServerNetworkError = ( error: { message: string },dispatch: ErrorUtilsDispatchType) => {
//     dispatch(appAction.setAppError({error: error.message}))
//     dispatch(appAction.setAppStatus({status:'idle'}))
// }




export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch):void => {
  let errorMessage = "Some error occurred";

  // ❗Проверка на наличие axios ошибки
  if (axios.isAxiosError(err)) {
    // ⏺️ err.response?.data?.message - например получение тасок с невалидной todolistId
    // ⏺️ err?.message - например при создании таски в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
    // ❗ Проверка на наличие нативной ошибки
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
    // ❗Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(appAction.setAppError({ error: errorMessage }));
  dispatch(appAction.setAppStatus({ status: "failed" }));
};
