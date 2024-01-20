import React, { ChangeEvent, FC, KeyboardEvent, useCallback, useState } from "react";
import { filterTodoListType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { AppBar } from "@mui/material";
import { ButtonAppBar } from "./AppBar/AppBar";
import { CheckBox } from "./CheckBox";
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodoListTypeProps = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (Id: string, todolistID: string) => void;
    changeFilter: (value: filterTodoListType, todolistId: string) => void;
    addTask: (todolistID: string, title: string) => void;
    chekedChechbox: (
        taskId: string,
        todolistID: string,
        isDone: boolean
    ) => void;
    removeTodolist: (todolistID: string) => void;
    filter: string;
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void;
    updateTodolist: (todolistID: string, trimedTitle: string) => void;
};

export const TodoList: FC<TodoListTypeProps> = React.memo ( ({
    changeFilter,
    id,
    removeTask,
    tasks,
    title,
    addTask,
    filter,
    chekedChechbox,
    removeTodolist,
    updateTask,
    updateTodolist,
}) => {
    console.log("TODOOOO");
    
    const onAllClickHandler = () => {
        changeFilter("All", id);
    };
    const onActiveClickHandler = () => {
        changeFilter("Active", id);
    };
    const onComplitedClickHandler = () => {
        changeFilter("Completed", id);
    };
    const onRevoveTodolistHandler = () => {
        removeTodolist(id);
    };

    const addTaskHandler = useCallback( (trimedTitle: string) => {
        addTask(trimedTitle, id);
    }, [addTask]);

    const updateTodolistHandler = (titleInput: string) => {
        updateTodolist(id, titleInput);
    };

let filterTodoList = tasks
    if (filter === "Active") {
        filterTodoList = tasks.filter(tasks => tasks.isDone === false)
    }
    if (filter === "Completed") {
        filterTodoList = tasks.filter(tasks => tasks.isDone === true)
    }

    return (
        
        <div >
            <div>
            
                <h3>
                    <EditableSpan
                        callBack={updateTodolistHandler}
                        oldTitle={title}
                    />
                    <IconButton onClick={onRevoveTodolistHandler}>
                        <DeleteIcon />
                    </IconButton>
                </h3>
                
                <AddItemForm callBack={addTaskHandler} />

                <ul className="list">
                    {tasks.map((t) => {
                        const onChengeCheckboxStatusHandler = (
                            e: ChangeEvent<HTMLInputElement>
                        ) => {
                            chekedChechbox(t.id, id, e.currentTarget.checked);
                        };
                        const updateTaskHandler = (titleInput: string) => {
                            updateTask(id, t.id, titleInput);
                        };
                        return (
                            <li className={t.isDone ? "task-done" : "task"}>
                              
                                <Checkbox size="small" 
                                    checked={t.isDone}
                                    onChange={onChengeCheckboxStatusHandler}
                                />

                                <EditableSpan
                                    callBack={updateTaskHandler}
                                    oldTitle={t.title}
                                />
                                <IconButton>
                                    <DeleteIcon color="secondary" onClick={() => {
                                        removeTask(t.id, id);
                                    }}/>
                                

                                </IconButton>
                            </li>
                        );
                    })}
                </ul>

                <div className="btn-container">
                    <Button variant={filter === "All" ? "contained" : "text"}
                        onClick={onAllClickHandler}> All
                    </Button>
                    <Button
                        variant={filter === "Active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}
                        color="success"
                    > Active

                    </Button>

                    <Button
                        variant={filter === "Completed" ? "contained" : "text"}
                        color="secondary"
                        onClick={onComplitedClickHandler}
                    >
                            Completed
                    </Button>

                </div>
            </div>
        </div>
    );
});
