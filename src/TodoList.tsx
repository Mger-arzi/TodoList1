import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button } from './Button';
import { filterTodoListType } from './App';
import { time } from 'console';

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
    chekedChechbox: (taskId: string, isDone: boolean)=> void
    filter: string

}


export const TodoList: FC<TodoListTypeProps> = ({ changeFilter, removeTask, tasks, title, addTask, filter, chekedChechbox}) => {
    
    const [titleInput, setTitle] = useState("")
    const [inputError, setInputError] = useState<string | null>(null)

    const ClickAddTask = () => {
        let trimedTitle = titleInput.trim()
        if(trimedTitle){
            addTask(trimedTitle) 
        }else{
            setInputError("Error vasay")
        }
        setTitle("")
    }
    const onChengeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
            inputError && setInputError(null)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
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
                        onChange={onChengeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={inputError ? "inputError" : ""}
                    />
                    <Button name="+" onClickHandler={ClickAddTask}
                        disabled={!titleInput}
                    />
                    {inputError && <div className='error-message'>{inputError}</div>}
                </div>
                <ul>

                    {
                        tasks.map((task) => {
                            const onChengeCheckboxStatusHandler = (e: ChangeEvent<HTMLInputElement>)=>  {
                                chekedChechbox(task.id, e.currentTarget.checked)
                            }

                            return   <li>
                                <input type="checkbox" 
                                    checked={task.isDone} 
                                    onChange={onChengeCheckboxStatusHandler} />
                                <span>{task.title}</span>
                                <Button
                                    onClickHandler={() => {
                                        removeTask(task.id);
                                    }}
                                    name={"✖️"}
                            />
                            </li>
                        })        
                    }
                </ul>
                <div className='btn-container'>
                    <Button onClickHandler={onAllClickHandler} 
                            name="All" 
                            classes={filter === "All" ? "btn-active" : "btn"}
                            filter='All'/>
                    <Button onClickHandler={onActiveClickHandler} 
                            name="Active"   
                            filter='Active'
                            classes={filter === "Active" ? "btn-active" : "btn"}/>
                    <Button onClickHandler={onComplitedClickHandler} 
                            name="Completed" 
                            classes={filter === "Completed" ? "btn-active" : "btn"}
                            />
                </div>
            </div>
        </div>
    );
};

