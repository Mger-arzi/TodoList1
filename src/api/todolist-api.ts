import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
})

export const todolistAPI = {
    getTodolist() {
        const promise = instance.get(
            `todo-lists/`,
        )
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post(
            `todo-lists/`,
            {title: title}
        )
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete(
            `todo-lists/${todolistId}`,
        )
        return promise
    },
    updateTodolist(todolistId: string, title: string){
        const propmis = instance.put(
            `todo-lists/${todolistId}`,
            {title: title}
        )
        return propmis
        // const propmis = instance.put(
        //     `todo-list/${todolistId}`,
        //     {title: title}
        // )
    }
}