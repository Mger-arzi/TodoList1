import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { tasksAPI } from '../api/tasks-api'

export default {
    title: 'API TASKS',
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const getTaskHandler = () => {
        tasksAPI.getTasks(todolistId)
        .then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder='todolistId'  type="text" value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
        <button onClick={getTaskHandler}>CREATE</button>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')


    const createTaskHandler = ()=>{
        tasksAPI.createTask(todolistId, title)
        .then((res)=>{
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder='todolistId'  type="text" value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
        <input placeholder=' new title'  type="text" value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
        <button onClick={createTaskHandler}>CREATE</button>
    </div>
}   

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState('')
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')


    const updateTaskHandler = ()=>{
        tasksAPI.updateTask(todolistId, taskId, title)
        .then((res)=>{
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder='taskId' type="text" value={taskId} onChange={(e)=>setTaskId(e.currentTarget.value)}/>
        <input placeholder='todolistId'  type="text" value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
        <input placeholder=' new title'  type="text" value={title   } onChange={(e)=>setTitle(e.currentTarget.value)}/>
        <button onClick={updateTaskHandler}>UPDATE</button>
    </div>
} 
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState('')
    const [todolistId, setTodolistId] = useState('')

    const deleteTaskHandler = ()=>{
        tasksAPI.deleteTask(todolistId, taskId)
        .then((res)=>{
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
    <input placeholder='taskId' type="text" value={taskId} onChange={(e)=>setTaskId(e.currentTarget.value)}/>
    <input placeholder='todolistId'  type="text" value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
    <button onClick={deleteTaskHandler}>DELETE</button>
    </div>
} 