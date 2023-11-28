import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';

export type filterTodoListType = "All" | "Active" | "Completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "HTML/CSS", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "Redux", isDone: false }
    ])


    const [filter, setFilter] = useState<filterTodoListType>("All")

    let filterTodoList = tasks
    if (filter === "Active") {
        filterTodoList = filterTodoList.filter(tasks => tasks.isDone === false)
    }
    if (filter === "Completed") {
        filterTodoList = filterTodoList.filter(tasks => tasks.isDone === true)
    }
    const changeFilter = (value: filterTodoListType) => {
        setFilter(value)
    }

    const removeTask = (id: string) => {
        const nextState = tasks.filter(tasks => tasks.id !== id)
        setTasks(nextState)
    }



    //create task

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const nextState: Array<TaskType> = [newTask, ...tasks ]
        // setTasks(nextState)
        setTasks([newTask, ...tasks])
    }

    //chek chekbox

    const chekedChechbox = (taskId: string, isDone: boolean) =>{
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }
    


    return (
        <div className='App'>
            <TodoList
                removeTask={removeTask}
                changeFilter={changeFilter}
                title='What to learn'
                tasks={filterTodoList}
                addTask={addTask} 
                filter = {filter}
                chekedChechbox ={chekedChechbox}/>
        </div>
    );
}

export default App;
