import axios from "axios"


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
})

export const tasksAPI = {
    getTasks(todolistId: string) {
        const promise = instance.get(
            `/todo-lists/${todolistId}/tasks`,
        )
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post(
            `/todo-lists/${todolistId}/tasks`,
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
    updateTask(todolistId: string, taskId:string, title: string){
        const propmis = instance.put(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            {title: title}
        )
        return propmis
    },
    deleteTask(todolistId: string, taskId:string){
        const propmis = instance.put(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
        )
        return propmis
    }
}