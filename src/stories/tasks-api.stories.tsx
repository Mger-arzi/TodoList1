import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { tasksAPI } from '../api/tasks-api'

export default {
    title: 'API TASKS',
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "3a8c9424-afdf-49f8-9800-41f1f840c08f"
    useEffect(() => {
        tasksAPI.getTasks(todolistId)
        .then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "e3469cb6-c5df-48a5-b1ab-3e7bdf1810a8"

    useEffect(()=>{
        tasksAPI.createTask(todolistId, "WWW222 task")
        .then((res)=>{
            setState(res.data)
        })
    },[])
    return <div>{JSON.stringify(state)}</div>
}   

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "3a8c9424-afdf-49f8-9800-41f1f840c08f"
    const taskId = "c6b06d6e-6fff-46aa-a29b-ee20879f1d07"
    useEffect(()=>{
        tasksAPI.updateTask(todolistId, taskId, "MYYYYY task")
        .then((res)=>{
            setState(res.data)
        })
    },[])
    return <div>{JSON.stringify(state)}</div>
} 
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "3a8c9424-afdf-49f8-9800-41f1f840c08f"
    const taskId = "c6b06d6e-6fff-46aa-a29b-ee20879f1d07"
    useEffect(()=>{
        tasksAPI.deleteTask(todolistId, taskId)
        .then((res)=>{
            setState(res.data)
        })
    },[])
    return <div>{JSON.stringify(state)}</div>
} 