import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button } from './Button';
import { filterTodoListType } from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListTypeProps = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (Id: string, todolistID: string) => void
    changeFilter: (value: filterTodoListType, todolistId: string) => void
    addTask: (todolistID: string, title: string) => void
    chekedChechbox: (taskId: string, todolistID: string, isDone: boolean) => void
    removeTodolist:(todolistID:string) => void
    filter: string

}


export const TodoList: FC<TodoListTypeProps> = ({ changeFilter, id, removeTask, tasks, title, addTask, filter, chekedChechbox, removeTodolist}) => {

    const [titleInput, setTitle] = useState("")
    const [inputError, setInputError] = useState<string | null>(null)

    const [isCollapsedTodo, setIsCollapsedTodo] = useState(false)


    const ClickAddTask = () => {
        let trimedTitle = titleInput.trim()
        if (trimedTitle) {
            addTask(trimedTitle, id)
        } else {
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
        changeFilter("All", id)
    }
    const onActiveClickHandler = () => {
        changeFilter("Active", id)
    }
    const onComplitedClickHandler = () => {
        changeFilter("Completed", id)
    }
    const onRevoveTodolistHandler = ( ) =>{
        removeTodolist(id)
    }
    let ShowUlTasks = <>
        <ul className='list'>
            {

            
            
                tasks.map((task) => {
                    const onChengeCheckboxStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        chekedChechbox(task.id, id, e.currentTarget.checked)
                    }

                    return <li className={task.isDone ? "task-done" : "task"}>
                        <input type="checkbox"
                            checked={task.isDone}
                            onChange={onChengeCheckboxStatusHandler} />
                        <span>{task.title}</span>
                        <Button
                            onClickHandler={() => {
                                removeTask(task.id, id);
                            }}
                            name={"✖️"}
                        />
                    </li>
                })
            }
        </ul>
     </>
     const chechCollapsedTasks = (e: ChangeEvent<HTMLInputElement>) => { setIsCollapsedTodo(e.currentTarget.checked) }

    return (
        <div className="TodoList">
            <div>
                <h3>{title}
                <Button name='X' onClickHandler={onRevoveTodolistHandler}/> </h3>
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

                <div >{isCollapsedTodo ? "show" : "show"}
                    <input type="checkbox" onChange={chechCollapsedTasks} />
                </div>
                {isCollapsedTodo ? ShowUlTasks : null}
                <div className='btn-container'>
                    <Button onClickHandler={onAllClickHandler}
                        name="All"
                        classes={filter === "All" ? "btn-active" : "btn"}
                        filter='All' />
                    <Button onClickHandler={onActiveClickHandler}
                        name="Active"
                        filter='Active'
                        classes={filter === "Active" ? "btn-active" : "btn"} />
                    <Button onClickHandler={onComplitedClickHandler}
                        name="Completed"
                        classes={filter === "Completed" ? "btn-active" : "btn"}
                        filter='Completed'
                    />
                </div>
            </div>
        </div>
    );
};

