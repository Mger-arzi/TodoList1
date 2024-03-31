import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector, } from 'react-redux';
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore, } from 'redux';
import { ThunkDispatch, thunk } from 'redux-thunk';
import { todolistsReducer } from '../components/features/TodolistList/todolists-reducer';
import { authReducer } from '../components/features/login/auth-reducer';
import { tasksReducer } from '../components/tasks/tasks-reducer';
import { appReducer } from './app-reducer';


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
// непосредственно создаём store

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// export const store = configureStore({
//     reducer: rootReducer,
//     middleware : getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
// });

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
