import React, { useReducer, useState } from 'react';
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

export type filterTodoListType = "All" | "Active" | "Completed"

export type TodolistsType = {
    id: string
    title: string
    filter: filterTodoListType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export function AppWithReducers() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    })


    const changeFilter = (value: filterTodoListType, todolistId: string) => {
        dispatchTodolists(changeFilterAC(value, todolistId))
    }

    const removeTask = (id: string, todolistID: string) => {
        dispatchTasks(removeTaskAC(id, todolistID))
    }
    //create task
    const addTask = (title: string, todolistID: string) => {
        dispatchTasks(addTaskAC(title, todolistID))
    }

    //chek chekbox

    const chekedChechbox = (taskId: string, todolistID: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(taskId , isDone,todolistID ))
    }
    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const addTodolist = (trimedTitle: string) => {
    const action = addTodolistAC(trimedTitle)
    dispatchTasks(action)
    dispatchTodolists(action)
    }
    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        dispatchTasks(updateTitleTaskAC(todolistID, taskID, newTitle))

    }
    const updateTodolist = (todolistID: string, titleInput: string) => {
        dispatchTodolists(updateTodolistAC(todolistID, titleInput ))
    }
    return (
        <div className='App'>
            <ButtonAppBar />


            <Container>
                <Grid style ={{padding: '20px'}} container>
                    <AddItemForm callBack={addTodolist} />

                </Grid>

                <Grid container spacing={4}>
                    {
                        todolists.map(todolist => {
                            let filterTodoList = tasks[todolist.id]
                            if (todolist.filter === "Active") {
                                filterTodoList = filterTodoList.filter(tasks => tasks.isDone === false)
                            }
                            if (todolist.filter === "Completed") {
                                filterTodoList = filterTodoList.filter(tasks => tasks.isDone === true)
                            }

                            return <Grid>
                                <Paper style={{padding: "15px"}} elevation={3}>

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
