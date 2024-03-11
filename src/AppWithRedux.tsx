import React, { useCallback, useEffect, useReducer, useState } from 'react';
import './App.css';
import {  TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import Grid from '@mui/material/Unstable_Grid2';

import { ButtonAppBar } from './AppBar/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import { TodolistsDomainType, addTodolistAC, changeFilterAC, getTodolistsTC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTitleTaskAC } from './state/tasks-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch, useAppSelector } from './state/store';
import { useDispatch } from 'react-redux';
import { TodoListWithRedux } from './TodoListWithRedux';
import { TaskType } from './api/tasks-api';



export type TasksStateType = {
    [key: string]: TaskType[]
}
export function AppWithRedux() {

    console.log("AppWithRedux");

    const todolists = useAppSelector <Array<TodolistsDomainType>>(state => state.todolists)


    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch();

    // const removeTask = useCallback((id: string, todolistID: string) => {
    //     dispatch(removeTaskAC(id, todolistID))
    // }, [dispatch])

    // const addTask = useCallback((title: string, todolistID: string) => {
    //     dispatch(addTaskAC(title, todolistID))
    // }, [dispatch])

    // const updateTask = useCallback((todolistID: string, taskID: string, newTitle: string) => {
    //     dispatch(updateTitleTaskAC(todolistID, taskID, newTitle))
    // }, [dispatch])

    // const chekedChechbox = useCallback((taskId: string, todolistID: string, isDone: boolean) => {
    //     dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    // }, [dispatch])


    // const removeTodolist = useCallback((todolistID: string) => {
    //     const action = removeTodolistAC(todolistID)
    //     dispatch(action)
    // }, [dispatch])

    const addTodolist = useCallback((trimedTitle: string) => {
        const action = addTodolistAC(trimedTitle)
        dispatch(action)
    }, [dispatch])

    // const changeFilter = useCallback((value: filterTodoListType, todolistId: string) => {
    //     dispatch(changeFilterAC(value, todolistId))
    // }, [dispatch])

    // const updateTodolist = useCallback((todolistID: string, titleInput: string) => {
    //     dispatch(updateTodolistAC(todolistID, titleInput))
    // }, [dispatch])

    useEffect(( ) => {
        dispatch(getTodolistsTC())
    },[])
    
    return (
        <div className='App'>
            <ButtonAppBar />


            <Container>
                <Grid style={{ padding: '20px' }} container>
                    <AddItemForm  Item = {addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {
                        todolists.map(todolist => {
                            // let filterTodoList = tasks[todolist.id]

                            return <Grid key={todolist.id}>
                                <Paper style={{ padding: "15px" }} elevation={3}>

                                    <TodoListWithRedux
                                        // key={todolist.id}
                                        title={todolist.title}
                                        filter={todolist.filter}
                                        id={todolist.id}
                                        addedDate={new Date}
                                        order={0}
                                        // removeTask={removeTask}
                                        // changeFilter={changeFilter}
                                        // tasks={filterTodoList}
                                        // addTask={addTask}
                                        // removeTodolist={removeTodolist}
                                        // chekedChechbox={chekedChechbox}
                                        // updateTask={updateTask}
                                        // updateTodolist={updateTodolist}
                                        />
                                </Paper>

                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
