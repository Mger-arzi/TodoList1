import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';

function App() {

    // const tasks1 = [
    //     {id: 1, title: "JS", isDone: true},
    //     {id: 2, title: "HTML/CSS", isDone: true},
    //     {id: 3, title: "React", isDone: true}
    // ]
    

    const [tasks, setTasks] = useState([
        {id: 1, title: "JS", isDone: true},
        {id: 2, title: "HTML/CSS", isDone: true},
        {id: 3, title: "React", isDone: true}
    ])

    const removeTask = (id: number) => {
        const nextState = []
    }
    // setTasks(nextState)
    return (
        <div className='App'>
            <TodoList title='What to learn' tasks={tasks}/>
        </div>
    );
}

export default App;
