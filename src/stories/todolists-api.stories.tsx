import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API',
}
const seting = {
    withCredentials: true,
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
        .then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => { 
        todolistAPI.createTodolist('MY todolist')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId ="212d28a8-27d3-4f98-a7a7-0c1513e8878c"
    useEffect(() => { 
        todolistAPI.deleteTodolist(todolistId)
        .then(res=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "e3469cb6-c5df-48a5-b1ab-3e7bdf1810a8"

    useEffect(() => { 
        todolistAPI.updateTodolist(todolistId,'NEW TITLE')
        .then(res=>{
            setState(res.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}