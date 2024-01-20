import React, { useCallback, useReducer, useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import Grid from '@mui/material/Unstable_Grid2';

import { ButtonAppBar } from './AppBar/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import { addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTitleTaskAC } from './state/tasks-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useDispatch } from 'react-redux';

export type filterTodoListType = "All" | "Active" | "Completed"

export type TodolistsType = {
    id: string
    title: string
    filter: filterTodoListType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export function AppWithRedux() {

    console.log("AppppPp");

    let todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistID: string) => {
        dispatch(removeTaskAC(id, todolistID))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }, [dispatch])

    const updateTask = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        dispatch(updateTitleTaskAC(todolistID, taskID, newTitle))
    }, [dispatch])

    const chekedChechbox = useCallback((taskId: string, todolistID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    }, [dispatch])


    const removeTodolist = useCallback((todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((trimedTitle: string) => {
        const action = addTodolistAC(trimedTitle)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((value: filterTodoListType, todolistId: string) => {
        dispatch(changeFilterAC(value, todolistId))
    }, [dispatch])

    const updateTodolist = useCallback((todolistID: string, titleInput: string) => {
        dispatch(updateTodolistAC(todolistID, titleInput))
    }, [dispatch])

    return (
        <div className='App'>
            <ButtonAppBar />


            <Container>
                <Grid style={{ padding: '20px' }} container>
                    <AddItemForm callBack={addTodolist} />

                </Grid>

                <Grid container spacing={4}>
                    {
                        todolists.map(todolist => {
                            let filterTodoList = tasks[todolist.id]
                            // if (todolist.filter === "Active") {
                            //     filterTodoList = filterTodoList.filter(tasks => tasks.isDone === false)
                            // }
                            // if (todolist.filter === "Completed") {
                            //     filterTodoList = filterTodoList.filter(tasks => tasks.isDone === true)
                            // }

                            return <Grid>
                                <Paper style={{ padding: "15px" }} elevation={3}>

                                    <TodoList
                                        key={todolist.id}
                                        id={todolist.id}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        title={todolist.title}
                                        tasks={filterTodoList}
                                        addTask={addTask}
                                        filter={todolist.filter}
                                        removeTodolist={removeTodolist}
                                        chekedChechbox={chekedChechbox}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolist} />
                                </Paper>

                            </Grid>
                        })


                    }
                </Grid>

            </Container>
        </div>
    );
}
