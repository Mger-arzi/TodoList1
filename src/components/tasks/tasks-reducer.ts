import { TasksStateType } from "../../App";
import {  addTodolistAC, getTodolistsAC, removeTodolistAC } from "../features/TodolistList/todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType, tasksAPI } from "../../api/tasks-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../../app/store";


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
    tasksAPI.getTasks(todolistId).then((res) => {
        dispatch(setTasksAC(res.data.items, todolistId))
    })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TaskReducerType>) => {
    tasksAPI.deleteTask(todolistId, taskId).then((res) => {
        dispatch(removeTaskAC(todolistId, taskId))
    })
}
export const addTaskTC = (todolistId: string , title: string ) => (dispatch: Dispatch<TaskReducerType>) => {
    tasksAPI.createTask(todolistId, title).then((res) => {
        dispatch(addTaskAC( res.data.data.item ))
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
            tasksAPI.updateTask(todolistId, taskId, APImodel).then((res) => {
                dispatch(updateTaskAC(todolistId, taskId , domainModel))
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

let initialState: TasksStateType = {}
