import { TodoListType, todolistAPI } from "../../../api/todolist-api";
import { Dispatch } from "redux";
import { RequestStatusType } from "../../../app/app-slice";
import { appAction } from '../../../app/app-slice';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../../utils/create-app-async-thunk";
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils";

const getTodolists = createAppAsyncThunk<{ todolists: TodoListType[] }, undefined>('todo/get', async (_, thunkAPI) => {
  const { dispatch } = thunkAPI
  dispatch(appAction.setAppStatus({ status: "loading" }))
  try {
    const res = await todolistAPI.getTodolists()
    dispatch(appAction.setAppStatus({ status: "idle" }))
    return { todolists: res.data }
  }
  catch (e) {
    handleServerNetworkError(e, dispatch)
    return thunkAPI.rejectWithValue(null)
  }
  finally{
    dispatch(appAction.setAppStatus({ status: "idle" }))

  }
})

const addTodolist = createAppAsyncThunk<{ todolist: TodoListType }, { title: string }>('todo/add', async ({ title }, thunkAPI) => {
  const { dispatch } = thunkAPI
  dispatch(appAction.setAppStatus({ status: "loading" }))
  try {
    const res = await todolistAPI.createTodolist(title)
    if (res.data.resultCode === 0) {
      dispatch(appAction.setAppStatus({ status: "idle" }))
      return { todolist: res.data.data.item }
    }
    else{
      dispatch(appAction.setAppStatus({ status: "idle" }))
      handleServerAppError(res.data, dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  }
  catch (e) {
    handleServerNetworkError(e, dispatch)
    return thunkAPI.rejectWithValue(null)
  }
})

const removeTodolist = createAppAsyncThunk<{ id: string }, { id: string }>('todo/remove', async ({ id }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(todolistsActions.changeTodolistEntityStatus({ id, status: "loading" }))
  try {
    const res = await todolistAPI.deleteTodolist(id)
    return { id }
  }
  catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const updateTodolist = createAppAsyncThunk<{ id: string, title: string }, { id: string, title: string }>('todo/update', async (arg, thunkAPI) => {

  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const res = await todolistAPI.updateTodolist(arg.id, arg.title)
    return arg
  }
  catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})



const slice = createSlice({
  name: "todolist",
  initialState: [] as Array<TodolistsDomainType>,
  reducers: {
    changeFilter(state, action: PayloadAction<{ id: string, filter: FilterTodoListType }>) {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.status
    },

    clearDate(state, action: PayloadAction) {
      return state = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map(el => ({ ...el, filter: "All", entityStatus: "idle" }))
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(updateTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state[index].title = action.payload.title
      })
  }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { getTodolists, addTodolist, removeTodolist, updateTodolist }





export type FilterTodoListType = "All" | "Active" | "Completed"
export type TodolistsDomainType = TodoListType & { filter: FilterTodoListType } & { entityStatus: RequestStatusType }
