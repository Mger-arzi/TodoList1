import React, { ChangeEvent, FC, KeyboardEvent, useCallback, useState } from "react";
import { AddItemForm } from "./components/addItemForm/AddItemForm";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { AppBar } from "@mui/material";
import { ButtonAppBar } from "./AppBar/AppBar";
import { CheckBox } from "./components/CheckBox";
import { Task } from "./components/tasks/Task";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./app/store";
import { TasksStateType } from "./app/AppWithRedux";
import { TaskStatuses, TaskType } from "./api/tasks-api";
import { FilterTodoListType } from "./components/features/TodolistList/todolists-reducer";


type TodoListTypeProps = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (Id: string, todolistID: string) => void;
    changeFilter: (value: FilterTodoListType, todolistId: string) => void;
    addTask: (todolistID: string, title: string) => void;
    chekedChechbox: (
        taskId: string,
        todolistID: string,
        status:TaskStatuses
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

    // const addTaskHandler = useCallback( (trimedTitle: string) => {
    //     addTask(trimedTitle, id);
    // }, [addTask, id]);

    const updateTodolistHandler = useCallback ( (titleInput: string) => {
        updateTodolist(id, titleInput);
    }, [updateTodolist , id]);

let filterTodoList = tasks
    if (filter === "Active") {
        filterTodoList = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === "Completed") {
        filterTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
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
                
                {/* <AddItemForm /> */}

                {filterTodoList.map(t => 
                    <Task 
                        // chekedChechbox={chekedChechbox}
                        key={t.id}
                        // removeTask={removeTask}
                        // updateTask={updateTask}
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



