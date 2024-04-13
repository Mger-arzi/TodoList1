import { TodoListType, todolistAPI } from "../../../api/todolist-api";
import { Dispatch } from "redux";
import { RequestStatusType } from "../../../app/app-reducer";
import { appAction } from './../../../app/app-reducer';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../../utils/create-app-async-thunk";
import { handleServerNetworkError } from "../../../utils/error-utils";

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
})
const addTodolist = createAppAsyncThunk<{ todolist: TodoListType }, { title: string }>('todo/add', async ({ title }, thunkAPI) => {
  const { dispatch } = thunkAPI
  dispatch(appAction.setAppStatus({ status: "loading" }))
  try {
    const res = await todolistAPI.createTodolist(title)
    dispatch(appAction.setAppStatus({ status: "idle" }))
    return { todolist: res.data.data.item }
  }
  catch (e) {
    handleServerNetworkError(e, dispatch)
    return thunkAPI.rejectWithValue(null)
  }
})
const removeTodolist = createAppAsyncThunk<{ id: string }, { id: string }>('todo/remove', async ({ id }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(todolistAction.changeTodolistEntityStatus({ id, status: "loading" }))
  try {
    const res = await todolistAPI.deleteTodolist(id)
    return { id }
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
    removeTodolist(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    updateTodolist(state, action: PayloadAction<{ id: string, title: string }>) {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    },
    changeFilter(state, action: PayloadAction<{ id: string, filter: FilterTodoListType }>) {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    // getTodolists(state, action: PayloadAction<{ todolists: Array<TodoListType> }>) {
    //   return action.payload.todolists.map(el => ({ ...el, filter: "All", entityStatus: "idle" }))
    // },
    changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.status
    },
    // addTodolist(state, action: PayloadAction<{ todolist: TodoListType }>) {
    //   state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
    // },
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
  }
})

export const todolistsReducer = slice.reducer
export const todolistAction = slice.actions
export const todolistThunk = { getTodolists, addTodolist , removeTodolist}

// thunk

export const updateTodolistTC = (id: string, title: string) => (dispatch: Dispatch) => {
  todolistAPI.updateTodolist(id, title).then((res) => {
    dispatch(todolistAction.updateTodolist({ id, title }))
  })
}

// export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
//   dispatch(appAction.setAppStatus({ status: "loading" }))

//   todolistAPI.createTodolist(title).then((res) => {
//     dispatch(todolistAction.addTodolist({ todolist: res.data.data.item }))
//     dispatch(appAction.setAppStatus({ status: "idle" }))

//   })
// }



export type FilterTodoListType = "All" | "Active" | "Completed"
export type TodolistsDomainType = TodoListType & { filter: FilterTodoListType } & { entityStatus: RequestStatusType }
