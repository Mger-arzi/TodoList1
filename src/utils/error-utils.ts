import { appAction } from '../app/app-slice'
import { Dispatch } from 'redux'
import { AppDispatch } from '../app/store';
import axios from 'axios';
import { BaseResponseType } from 'types/types';

type ErrorUtilsDispatchType = Dispatch
/**
 * handleServerAppError - обработка ошибки от сервера 
 * @param data - данные ответа сервера
 * @param dispatch - диспач для редюсера
 * @param ShowGlobalError - отображать глобальную ошибку или нет
 * @returns - void то что возвращает функция
 */
export const handleServerAppError = <T,>(
    data: BaseResponseType<T>,
    dispatch: ErrorUtilsDispatchType,
    ShowGlobalError: boolean = true

) => {
    if (ShowGlobalError) {
      if (data.messages.length) {
        dispatch(appAction.setAppError({error:data.messages[0]}))
    } else {
        dispatch(appAction.setAppError({error: 'Some error occurred'}))
    }
    }
   
    dispatch(appAction.setAppStatus({status: 'idle'}))
}



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
