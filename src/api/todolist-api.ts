import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
})
type TodoListType = {
    id: string,
    title: string,
    addedDate: Date,
    order : number
}
type FieldErrorType = {
    error: string
    field: string
}
type ResponseType<D = {}> = {
    resultCode: 0
    fieldsErrors:FieldErrorType[]
    messages: [],
    data: D
}

export const todolistAPI = {
    getTodolist() {
        const promise = instance.get<TodoListType>(
            `todo-lists/`,
        )
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType< {item: TodoListType[]} >>(
            `todo-lists/`,
            {title: title}
        )
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(
            `todo-lists/${todolistId}`,
        )
        return promise
    },
    updateTodolist(todolistId: string, title: string){
        const propmis = instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title}
        )
        return propmis
    }
}