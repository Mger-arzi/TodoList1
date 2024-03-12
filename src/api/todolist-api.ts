import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
})
// API
export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<TodoListType[]>(`todo-lists/`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists/`, { title })
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const propmis = instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })
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
export type ResponseType<D = {}> = {
    resultCode: 0
    fieldsErrors: FieldErrorType[]
    messages: [],
    data: D
}