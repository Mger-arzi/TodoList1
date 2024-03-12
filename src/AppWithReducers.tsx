import React, { useReducer, useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import Grid from '@mui/material/Unstable_Grid2';

import { ButtonAppBar } from './AppBar/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import { FilterTodoListType, addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './state/todolists-reducer';
import { addTaskAC, addTaskTC, removeTaskAC, tasksReducer, } from './state/tasks-reducer';
import { TaskPriorities, TaskStatuses, TaskType } from './api/tasks-api';




export type TasksStateType = {
    [key: string]: TaskType[]
}
export function AppWithReducers() {


    // let todolistID1 = v1()
    // let todolistID2 = v1()

    // let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    //     { id: todolistID1, title: 'What to learn', filter: 'All' ,addedDate: new Date,
    //     order: 0},
    //     { id: todolistID2, title: 'What to buy', filter: 'All' ,addedDate: new Date,
    //     order: 0},
    // ])

    // let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    //     [todolistID1]: [
    //         { id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "", 
    //         order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: todolistID1 },
    //         { id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "", 
    //         order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: todolistID1 },
    //         { id: v1(), title: 'ReactJS', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "", 
    //         order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: todolistID1 },

    //     ],
    //     [todolistID2]: [
    //         {
    //             id: v1(), title: 'Rest API', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "",
    //             order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: todolistID2
    //         },
    //         {
    //             id: v1(), title: 'GraphQL', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "",
    //             order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: todolistID2
    //         },
    //     ]
    // })


   

    // const removeTask = (id: string, todolistID: string) => {
    //     dispatchTasks(removeTaskAC(id, todolistID))
    // }
    // const addTask = (title: string, todolistID: string) => {
    //     dispatchTasks(addTaskTC(todolistID, title ))
    // }
    // const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
    //     dispatchTasks(updateTitleTaskAC(todolistID, taskID, newTitle))
    // }
    // const chekedChechbox = (taskId: string, todolistID: string, status:TaskStatuses) => {
    //     dispatchTasks(changeTaskStatusAC(taskId , status,todolistID ))
    // }

    
    // const removeTodolist = (todolistID: string) => {
    //     const action = removeTodolistAC(todolistID)
    //     dispatchTodolists(action)
    //     dispatchTasks(action)
    // }
    // // const addTodolist = (trimedTitle: string) => {
    // //     const action = addTodolistAC(trimedTitle)
    // //     dispatchTasks(action)
    // //     dispatchTodolists(action)
    // // }
    // const changeFilter = (value: FilterTodoListType, todolistId: string) => {
    //     dispatchTodolists(changeFilterAC(value, todolistId))
    // }
    // const updateTodolist = (todolistID: string, titleInput: string) => {
    //     dispatchTodolists(updateTodolistAC(todolistID, titleInput ))
    // }
    // return (
    //     <div className='App'>
    //         <ButtonAppBar />


    //         <Container>
    //             <Grid style ={{padding: '20px'}} container>
    //                 {/* <AddItemForm  /> */}

    //             </Grid>

    //             <Grid container spacing={4}>
    //                 {
    //                     todolists.map(todolist => {
    //                         let filterTodoList = tasks[todolist.id]
    //                         if (todolist.filter === "Active") {
    //                             filterTodoList = filterTodoList.filter(tasks => tasks.status === TaskStatuses.New)
    //                         }
    //                         if (todolist.filter === "Completed") {
    //                             filterTodoList = filterTodoList.filter(tasks => tasks.status === TaskStatuses.Completed)
    //                         }

    //                         return <Grid>
    //                             <Paper style={{padding: "15px"}} elevation={3}>

    //                             <TodoList
    //                                 key={todolist.id}
    //                                 id={todolist.id}
    //                                 removeTask={removeTask}
    //                                 changeFilter={changeFilter}
    //                                 title={todolist.title}
    //                                 tasks={filterTodoList}
    //                                 addTask={addTask}
    //                                 filter={todolist.filter}
    //                                 removeTodolist={removeTodolist}
    //                                 chekedChechbox={chekedChechbox}
    //                                 updateTask={updateTask}
    //                                 updateTodolist={updateTodolist} />
    //                             </Paper>

    //                         </Grid>
    //                     })


    //                 }
    //             </Grid>

    //         </Container>
    //     </div>
    // );
}
