import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';

export type filterTodoListType = "All" | "Active" | "Completed"

function App() {

   const [tasks, setTasks] = useState<Array<TaskType>>([
      { id: 1, title: "JS", isDone: true },
      { id: 2, title: "HTML/CSS", isDone: true },
      { id: 3, title: "React", isDone: false },
      { id: 4, title: "Redux", isDone: false }
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

   const removeTask = (id: number) => {
      const nextState = tasks.filter(tasks => tasks.id !== id)
      setTasks(nextState)
   }

   return (
      <div className='App'>
         <TodoList removeTask={removeTask}
            changeFilter={changeFilter}
            title='What to learn'
            tasks={filterTodoList} />
      </div>
   );
}

export default App;
