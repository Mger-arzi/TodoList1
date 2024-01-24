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
import { Task } from "./Task";
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
    
    const onAllClickHandler = useCallback ( () => {
        changeFilter("All", id);
    },[changeFilter , id]);

    const onActiveClickHandler = useCallback (() => {
        changeFilter("Active", id);
    },[changeFilter, id]);

    const onComplitedClickHandler = useCallback( () => {
        changeFilter("Completed", id);
    }, [changeFilter, id]);
    
    const onRevoveTodolistHandler =useCallback( () => {
        removeTodolist(id);
    },[removeTodolist, id]);

    const addTaskHandler = useCallback( (trimedTitle: string) => {
        addTask(trimedTitle, id);
    }, [addTask, id]);

    const updateTodolistHandler = useCallback ( (titleInput: string) => {
        updateTodolist(id, titleInput);
    }, [updateTodolist , id]);

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

                {filterTodoList.map(t => 
                    <Task chekedChechbox={chekedChechbox}
                        key={t.id}
                        removeTask={removeTask}
                        updateTask={updateTask}
                        task={t}
                        todolistId={id}

                    />)}

                <div >
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



