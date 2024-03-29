import { TasksStateType } from "../../App";
import {  addTodolistAC, getTodolistsAC, removeTodolistAC } from "../features/TodolistList/todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType, tasksAPI } from "../../api/tasks-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../../app/store";
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";


export const tasksReducer = (state = initialState, action: TaskReducerType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": 
            return { ...state, [action.payloard.todolistId]: state[action.payloard.todolistId].filter(el => el.id !== action.payloard.taskId) }
        case "ADD-TASK": 
            return {...state,[action.payloard.task.todoListId]:[action.payloard.task, ...state[action.payloard.task.todoListId ]]}
        case "UPDATE-TASK": 
            return { ...state, [action.payloard.todolistId]: state[action.payloard.todolistId]
                .map((t) =>  t.id === action.payloard.taskId ? { ...t, ...action.payloard.domainModel } : t )
            }
        case "ADD-TODOLIST": 
            return { ...state, [action.payloard.todolist.id]: [] }
        case "REMOVE-TODOLIST": {
            const { [action.payloard.id]: [], ...rest } = state
            return rest
        }
        case "GET-TODOLISTS": 
            const copyState = { ...state }
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        case "SET-TASKS": 
            return { ...state, [action.payloard.todolistId]: action.payloard.tasks } 
        default:
            return state;
    }
};


//action
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return { type: "SET-TASKS", payloard: { tasks, todolistId } } as const;
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return { type: "REMOVE-TASK", payloard: { taskId, todolistId } } as const;
}
export const addTaskAC = ( task: TaskType ) => {
    return { type: "ADD-TASK", payloard: { task }, } as const
};
export const updateTaskAC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType, ) => {
    return { type: "UPDATE-TASK", payloard: {  todolistId ,taskId, domainModel}, } as const;
};


//thunk
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch<TaskReducerType>) => {
    dispatch(setAppStatusAC("loading"))
    tasksAPI.getTasks(todolistId).then((res) => {
        dispatch(setTasksAC(res.data.items, todolistId))
    dispatch(setAppStatusAC("idle"))

    })
    .catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TaskReducerType>) => {
    dispatch(setAppStatusAC("loading"))

    tasksAPI.deleteTask(todolistId, taskId)
    .then((res) => {
        dispatch(removeTaskAC(todolistId, taskId))
    dispatch(setAppStatusAC("idle"))

    })
    .catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}
export const addTaskTC = (todolistId: string , title: string ) => (dispatch: Dispatch<TaskReducerType>) => {
    dispatch(setAppStatusAC('loading'))
    
    tasksAPI.createTask(todolistId, title)
    .then((res) => {
        if(res.data.resultCode === 0){
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('idle'))
        }else{
        handleServerAppError(res.data, dispatch)
        }

    })
    .catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<TaskReducerType>, getState: () => AppRootStateType) => { 
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if(task){
            const APImodel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel,
            }
            dispatch(setAppStatusAC('loading'))
            tasksAPI.updateTask(todolistId, taskId, APImodel)
            .then((res) => {
                if(res.data.resultCode === 0 ){
                    dispatch(updateTaskAC(todolistId,taskId,APImodel))
                    dispatch(setAppStatusAC('idle'))
                }else{
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
type TaskReducerType =
| ReturnType<typeof setTasksAC>
| ReturnType<typeof removeTaskAC>
| ReturnType<typeof addTaskAC>
| ReturnType<typeof updateTaskAC>
| ReturnType<typeof addTodolistAC>
| ReturnType<typeof removeTodolistAC>
| ReturnType<typeof getTodolistsAC>
| ReturnType<typeof setAppStatusAC>
| ReturnType<typeof setAppErrorAC>

let initialState: TasksStateType = {}
