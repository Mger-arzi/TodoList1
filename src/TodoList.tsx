import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button } from './Button';
import { filterTodoListType } from './App';

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type TodoListTypeProps = {
   title: string
   tasks: Array<TaskType>
   removeTask: (Id: string) => void
   changeFilter: (value: filterTodoListType) => void
   addTask: (title: string) => void

}


export const TodoList: FC<TodoListTypeProps> = ({ changeFilter, removeTask, tasks, title, addTask }) => {
   const [titleInput, setTitle] = useState("")
   const ClickAddTask = () => {
      { addTask(titleInput) }
      setTitle("")
   }
   const onChengeHandler =  (event: ChangeEvent<HTMLInputElement>) => {
         setTitle(event.currentTarget.value)
   }
   const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
         if(event.key ===  "Enter"){
            ClickAddTask()
         }
   }
   const onAllClickHandler = () => {
      changeFilter("All")
   }
   const onActiveClickHandler = () => {
      changeFilter("Active")
   }
   const onComplitedClickHandler = () => {
      changeFilter("Completed")
   }
      
   return (
      <div className="TodoList">
         <div>
            <h3>{title}</h3>
            <div>
               <input value={titleInput}
                  onChange={ onChengeHandler }
                  onKeyPress={ onKeyPressHandler }
               />
               <Button  name="+" onClickHandler={ClickAddTask} 
               disabled = {!titleInput }
               
               />
            </div>
            <ul>
               {tasks.map((task) => (
                  <li>
                     <input type="checkbox" checked={task.isDone} />{" "}
                     <span>{task.title}</span>
                     <Button
                        onClickHandler={() => {
                           removeTask(task.id);
                        }}
                        name={"✖️"}
                     />
                  </li>
               ))}
            </ul>
            <div>
               <Button onClickHandler={onAllClickHandler} name="All" />
               <Button onClickHandler={onActiveClickHandler} name="Active" />
               <Button onClickHandler={onComplitedClickHandler} name="Completed" />
            </div>
         </div>
      </div>
   );
};

