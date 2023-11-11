import React from 'react';
import './App.css';
import { TodoList } from './TodoList';

function App() {

    const tasks1 = [
        {id: 1, title: "JS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "JS", isDone: true}
    ]
    const tasks2 = [
        {id: 4, title: "JS", isDone: true},
        {id: 5, title: "JS", isDone: true},
        {id: 6, title: "JS", isDone: true}
    ]
    const tasks3 = [
        {id: 7, title: "JS", isDone: true},
        {id: 8, title: "JS", isDone: true},
        {id: 9, title: "JS", isDone: true}
    ]
    return (
        <div className='App'>
            <TodoList title='What to learn' tasks={tasks1}/>
            <TodoList title='What to learn' tasks={tasks2}/>
            <TodoList title='What to learn' tasks={tasks3}/>
        </div>
    );
}

export default App;
