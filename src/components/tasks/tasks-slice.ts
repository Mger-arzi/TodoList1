import { TasksStateType } from "../../App";
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType, tasksAPI } from "../../api/tasks-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../../app/store";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { appAction } from "../../app/app-slice";
import { createSlice } from "@reduxjs/toolkit";
import {  todolistAction, todolistThunk } from "../features/TodolistList/todolists-slice";
import { createAppAsyncThunk } from "../../utils/create-app-async-thunk";
import { ResultCode } from "../../types/ResultCode";


export const setTasks = createAppAsyncThunk
  <{ todolistId: string, tasks: TaskType[] }, string>
  ('tasks/setTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appAction.setAppStatus({ status: "loading" }))
    try {
      const res = await tasksAPI.getTasks(todolistId)
      thunkAPI.dispatch(appAction.setAppStatus({ status: "idle" }))
      const tasks = res.data.items
      return { todolistId, tasks }
    }
    catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  })

export const addTask = createAppAsyncThunk<{ tasks: TaskType }, { todolistId: string, title: string }>
  ('tasks/addTask', async (arg, thunkAPI) => {


    thunkAPI.dispatch(appAction.setAppStatus({ status: 'loading' }))
    try {
      const res = await tasksAPI.createTask(arg.todolistId, arg.title)

      if (res.data.resultCode === ResultCode.success) {
        const tasks = res.data.data.item

        thunkAPI.dispatch(appAction.setAppStatus({ status: 'idle' }))
        return { tasks }
      }
      else {
        handleServerAppError(res.data, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
      }
    }
    catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  })


type UpdateTaskArgType = {
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
}
const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>('task/update', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI
  try {
    dispatch(appAction.setAppStatus({ status: 'loading' }))
    const state = getState()
    const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
    if (!task) {
      dispatch(appAction.setAppError({ error: 'Task not found' }))
      return rejectWithValue(null)
    }
    const APImodel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...arg.model,
    }
    const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, APImodel)
    if (res.data.resultCode ===ResultCode.success) {
      dispatch(appAction.setAppStatus({ status: 'idle' }))
      return arg
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)

    }
  }
  catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})
const removeTask = createAppAsyncThunk
<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }>('task/remove', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appAction.setAppStatus({ status: "loading" }))
  try {
    const res = await tasksAPI.deleteTask(arg.todolistId, arg.taskId)
    dispatch(appAction.setAppStatus({ status: "idle" }))
    return arg
  }
  catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistThunk.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistThunk.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistThunk.getTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(todolistAction.clearDate, (state, action) => {
        return state = {}
      })
      .addCase(setTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.tasks.todoListId].unshift(action.payload.tasks)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex(todo => todo.id === action.payload.taskId)
        if (index !== -1) state[action.payload.todolistId][index] = { ...state[action.payload.todolistId][index], ...action.payload.model }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex(todo => todo.id === action.payload.taskId)
        if (index !== -1) state[action.payload.todolistId].splice(index, 1)
      })
  }
})
export const tasksAction = slice.actions
export const tasksReducer = slice.reducer
export const tasksThunk = { setTasks, addTask, updateTask ,removeTask}



// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: Date
  deadline?: Date
}

