import React, { useState } from 'react';
import './App.css';

import { v1 } from 'uuid';
import Grid from '@mui/material/Unstable_Grid2';

import { MyAppBar } from './AppBar/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import { TaskPriorities, TaskStatuses, TaskType } from './api/tasks-api';
import { FilterTodoListType, TodolistsDomainType } from './components/features/TodolistList/todolists-reducer';
import { TodoList } from './TodoList';




export type TasksStateType = {
    [key: string]: TaskType[]
}
function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsDomainType>>([
        {
            id: todolistID1, title: 'What to learn', filter: 'All',entityStatus: "idle", addedDate: new Date,
            order: 0,
        },
        {
            id: todolistID2, title: 'What to buy', filter: 'All',entityStatus: "idle", addedDate: new Date,
            order: 0,
        },
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "", 
            order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: todolistID1 , entityStatus: "idle"},
            { id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "", 
            order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: todolistID1, entityStatus: "idle" },
            { id: v1(), title: 'ReactJS', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "", 
            order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: todolistID1 ,entityStatus: "idle" },

        ],
        [todolistID2]: [
            {
                id: v1(), title: 'Rest API', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "",
                order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: todolistID2, entityStatus: "idle"
            },
            {
                id: v1(), title: 'GraphQL', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "",
                order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: todolistID2, 
            entityStatus: "idle"

            },
        ]
    })


    const changeFilter = (value: FilterTodoListType, todolistId: string) => {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    const removeTask = (id: string, todolistID: string) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id) })
    }
    //create task
    const addTask = (title: string, todolistID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            status:TaskStatuses.New,
            addedDate: new Date,
            deadline: new Date,
            description: "",
            order: 0,
            priority: TaskPriorities.Low,
            startDate: new Date,
            todoListId: todolistID,
            entityStatus: "idle"
        }
        setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] })
    }

    //chek chekbox

    const chekedChechbox = (taskId: string, todolistID: string, status: TaskStatuses) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, status } : el) })
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
        setTasks({ ...tasks })
    }

    // const addTodolist = (trimedTitle: string) => {
    //     const newID = v1()
    //     const newTodo: TodolistsType = { id: newID, title: trimedTitle, filter: 'All' }
    //     setTodolists([newTodo, ...todolists])
    //     setTasks({ ...tasks, [newID]: [] })
    // }
    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? { ...t, title: newTitle } : t) })


    }
    const updateTodolist = (todolistID: string, titleInput: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? { ...el, title: titleInput } : el))
    }
    return (
        <div className='App'>
            <MyAppBar />


            <Container>
                <Grid style={{ padding: '20px' }} container>
                    {/* <AddItemForm  /> */}

                </Grid>

                <Grid container spacing={4}>
                    {
                        todolists.map(todolist => {
                            let filterTodoList = tasks[todolist.id]
                            if (todolist.filter === "Active") {
                                filterTodoList = filterTodoList.filter(tasks => tasks.status === TaskStatuses.New)
                            }
                            if (todolist.filter === "Completed") {
                                filterTodoList = filterTodoList.filter(tasks => tasks.status === TaskStatuses.Completed)
                            }

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

export default App;
