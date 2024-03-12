import axios from "axios"
import {ResponseType} from "./todolist-api"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
})

export let model : UpdateTaskModelType 
// API
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>( `/todo-lists/${todolistId}/tasks`,)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType< {item: TaskType} >>(`/todo-lists/${todolistId}/tasks`,{title} )
    },
    updateTask(todolistId: string, taskId:string, model: UpdateTaskModelType){
        return instance.put<ResponseType< {item: TaskType} >>( `/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId:string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`,)
    }
}
// types 
type GetTasksType ={
    totalCount: number,
    error: string | null 
    items: TaskType[]
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: Date,
    deadline: Date,
    addedDate: Date,
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
}