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
    const todolistId = "3a8c9424-afdf-49f8-9800-41f1f840c08f"

    useEffect(()=>{
        tasksAPI.createTask(todolistId, "WWWWWW task")
        .then((res)=>{
            setState(res.data)
        })
    },[])
    return <div>{JSON.stringify(state)}</div>
}   

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "3a8c9424-afdf-49f8-9800-41f1f840c08f"
    const taskId = "3f62ead1-3b75-47db-a1a1-3ae2356b1548"
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
    const taskId = "ea7a9a43-f596-407b-9de7-a6d610091fcb"
    useEffect(()=>{
        tasksAPI.deleteTask(todolistId, taskId)
        .then((res)=>{
            setState(res.data)
        })
    },[])
    return <div>{JSON.stringify(state)}</div>
} 