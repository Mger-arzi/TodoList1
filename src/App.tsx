import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type filterTodoListType = "All" | "Active" | "Completed"

type TodolistsType = {
    id: string
    title: string
    filter: filterTodoListType
}
type TasksStateType = {
    [key:string]:TaskType[]
}
function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    const removeTask = (id: string, todolistID:string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id )})
    }



    //create task

    const addTask = (title: string, todolistID:string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]})
        // setTasks(nextState)
        // setTasks([newTask, ...tasks])
    }

    //chek chekbox

    const chekedChechbox = (taskId: string, todolistID:string,isDone: boolean) => {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }


    return (
        <div className='App'>
            <AddItemForm addItem={()=>{}}/>

            {
                todolists.map(todolist => {
                    let filterTodoList = tasks[todolist.id]
                    if (todolist.filter === "Active") {
                        filterTodoList = filterTodoList.filter(tasks => tasks.isDone === false)
                    }
                    if (todolist.filter === "Completed") {
                        filterTodoList = filterTodoList.filter(tasks => tasks.isDone === true)
                    }

                    return <TodoList
                        key={todolist.id}
                        id={todolist.id}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        title={todolist.title}
                        tasks={filterTodoList}
                        addTask={addTask}
                        filter={todolist.filter}
                        removeTodolist = {removeTodolist}
                        chekedChechbox={chekedChechbox} />
                })
            }
        </div>
    );
}

export default App;
