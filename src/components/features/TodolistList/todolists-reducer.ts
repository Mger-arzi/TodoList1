import { TodoListType, todolistAPI } from "../../../api/todolist-api";
import { Dispatch } from "redux";
import { RequestStatusType } from "../../../app/app-reducer";
import { appAction } from './../../../app/app-reducer';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


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
    changeFilter(state, action: PayloadAction<{ id: string ,filter: FilterTodoListType }>) {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    getTodolists(state, action: PayloadAction<{ todolists: Array<TodoListType> }>) {
      return action.payload.todolists.map(el => ({ ...el, filter: "All", entityStatus: "idle" }))
    },
    changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.status
    },
    addTodolist(state, action: PayloadAction<{ todolist: TodoListType }>) {
      state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
    }
  }
})

export const todolistsReducer = slice.reducer
export const todolistAction = slice.actions

// thunk
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(todolistAction.changeTodolistEntityStatus({ id, status: "loading" }))
  todolistAPI.deleteTodolist(id).then((res) => {
    dispatch(todolistAction.removeTodolist({ id }))
  })
}
export const updateTodolistTC = (id: string, title: string) => (dispatch: Dispatch) => {
  todolistAPI.updateTodolist(id, title).then((res) => {
    dispatch(todolistAction.updateTodolist({ id, title }))
  })
}
export const getTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(appAction.setAppStatus({ status: "loading" }))
  todolistAPI.getTodolists().then((res) => {
    dispatch(todolistAction.getTodolists({ todolists: res.data }))
    dispatch(appAction.setAppStatus({ status: "idle" }))

  })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(appAction.setAppStatus({ status: "loading" }))

  todolistAPI.createTodolist(title).then((res) => {
    dispatch(todolistAction.addTodolist({ todolist: res.data.data.item }))
    dispatch(appAction.setAppStatus({ status: "idle" }))

  })
}



export type FilterTodoListType = "All" | "Active" | "Completed"
export type TodolistsDomainType = TodoListType & { filter: FilterTodoListType } & { entityStatus: RequestStatusType }
