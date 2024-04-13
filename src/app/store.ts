import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector, } from 'react-redux';
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore, } from 'redux';
import { ThunkDispatch, thunk } from 'redux-thunk';
import { todolistsReducer } from '../components/features/TodolistList/todolists-slice';
import { tasksReducer } from '../components/tasks/tasks-slice';
import { authReducer } from '../components/features/login/auth-slice';
import { appReducer } from './app-slice';

// непосредственно создаём store

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
  }
});

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const entityStatusSelector = (state: AppRootStateType) => state.app.status
export const appStatusSelector = (state: AppRootStateType) => state.app.status
export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized
export const isLoggenInSelictor = (state: AppRootStateType) => state.auth.isLoggenIn
export const tasksSelector = (state: AppRootStateType) => state.tasks
export const todolistsSelector = (state: AppRootStateType) => state.todolists
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
