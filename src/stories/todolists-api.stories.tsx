import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
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
    const todolistId ="872f87d8-58e7-4337-a3de-92f8b23562f7"
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