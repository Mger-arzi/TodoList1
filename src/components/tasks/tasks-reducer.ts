import { TasksStateType } from "../../App";
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType, tasksAPI } from "../../api/tasks-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../../app/store";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { appAction } from "../../app/app-reducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { action } from '@storybook/addon-actions';
import { todolistAction } from "../features/TodolistList/todolists-reducer";


const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    setTasks(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
      
      state[action.payload.todolistId] = action.payload.tasks
    },
    removeTask(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
      const index = state[action.payload.todolistId].findIndex(todo => todo.id === action.payload.taskId)
      if (index !== -1) state[action.payload.todolistId].splice(index, 1)
    },
    addTask(state, action: PayloadAction<{ task: TaskType }>) {
      
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTask(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
     
      const index = state[action.payload.todolistId].findIndex(todo => todo.id === action.payload.taskId)
      if (index !== -1) state[action.payload.todolistId][index] = { ...state[action.payload.todolistId][index], ...action.payload.model } 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistAction.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistAction.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistAction.getTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(todolistAction.clearDate, (state, action ) => {
        return state = {}
      })
  }
})
export const tasksAction = slice.actions
export const tasksReducer = slice.reducer

//thunk
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appAction.setAppStatus({ status: "loading" }))
  tasksAPI.getTasks(todolistId).then((res) => {
    dispatch(tasksAction.setTasks({ todolistId, tasks: res.data.items }))
    dispatch(appAction.setAppStatus({ status: "idle" }))

  })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(appAction.setAppStatus({ status: "loading" }))

  tasksAPI.deleteTask(todolistId, taskId)
    .then((res) => {
      dispatch(tasksAction.removeTask({ todolistId, taskId }))
      dispatch(appAction.setAppStatus({ status: "idle" }))

    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appAction.setAppStatus({ status: 'loading' }))

  tasksAPI.createTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(tasksAction.addTask({ task: res.data.data.item }))
        dispatch(appAction.setAppStatus({ status: 'idle' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }

    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (task) {
      const APImodel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...model,
      }
      dispatch(appAction.setAppStatus({ status: 'loading' }))
      tasksAPI.updateTask(todolistId, taskId, APImodel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(tasksAction.updateTask({ todolistId, taskId, model }))
            dispatch(appAction.setAppStatus({ status: 'idle' }))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch(error => {
          handleServerNetworkError(error, dispatch)
        })
    }
  }

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: Date
  deadline?: Date
}

