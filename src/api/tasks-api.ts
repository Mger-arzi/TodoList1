import axios from "axios"
import {ResponseType} from "./todolist-api"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
})
type GetTasksType ={
    totalCount: number,
    error: string | null 
    items: TaskType[]
}
export type TaskType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: Date,
    deadline: Date,
    addedDate: Date,
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>( `/todo-lists/${todolistId}/tasks`,)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType< {item: TaskType[]} >>(`/todo-lists/${todolistId}/tasks`,{title: title} )
    },
    updateTask(todolistId: string, taskId:string, title: string){
        return instance.put<ResponseType< {item: TaskType[]} >>( `/todo-lists/${todolistId}/tasks/${taskId}`,  {title: title})
    },
    deleteTask(todolistId: string, taskId:string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`,)
    }
}