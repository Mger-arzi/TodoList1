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
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TasksStateType, TodolistsType } from "./AppWithRedux";
import { useDispatch } from "react-redux";
import { removeTodolistAC, addTodolistAC, updateTodolistAC, changeFilterAC } from './state/todolists-reducer';
import { addTaskAC } from "./state/tasks-reducer";
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodoListTypeProps = {
    id: string;
    title: string;
    filter: string;

};



export const TodoListWithRedux: FC<TodoListTypeProps> = React.memo(({ id, title, filter }) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id]);

    let dispatch = useDispatch();

    let todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    // let todolistId = todolists[0].id

    const onRevoveTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(id));
    }, [id]);

    const addTaskHandler = useCallback((trimedTitle: string) => {
        dispatch(addTaskAC(trimedTitle, id));
    }, [id]);

    const updateTodolistHandler = useCallback((titleInput: string) => {
            dispatch(updateTodolistAC(id, titleInput))
    }, [id]);


    const onAllClickHandler = useCallback(() => {
        dispatch(changeFilterAC("All", id))
    }, [id]);

    const onActiveClickHandler = useCallback(() => {
        dispatch(changeFilterAC("Active", id))

    }, [id]);

    const onComplitedClickHandler = useCallback(() => {
        dispatch(changeFilterAC("Completed", id))

    }, [id]);

    if (filter === "Active") {
        tasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "Completed") {
        tasks = tasks.filter(t => t.isDone === true)
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

                <AddItemForm Item={addTaskHandler} />

                {tasks.map(t =>
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



