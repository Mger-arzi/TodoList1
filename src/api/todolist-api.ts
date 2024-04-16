import axios from 'axios'
import { instance } from './auth-api'


// API
export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<TodoListType[]>(`todo-lists/`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<BaseResponseType<{ item: TodoListType }>>(`todo-lists/`, { title })
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const propmis = instance.put<BaseResponseType>(`todo-lists/${todolistId}`, { title })
        return propmis
    }
}
// types 
export type TodoListType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}
export type FieldErrorType = {
    error: string
    field: string
}
export type BaseResponseType<D = {}> = {
    resultCode: 0
    fieldsErrors: FieldErrorType[]
    messages: string[],
    data: D
}