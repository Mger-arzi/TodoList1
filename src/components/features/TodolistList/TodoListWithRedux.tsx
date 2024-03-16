import React, {  FC,  useCallback, useEffect } from "react";
import { AddItemForm } from "../../addItemForm/AddItemForm";
import { EditableSpan } from "../../editableSpan/EditableSpan";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Task } from "../../tasks/Task";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../../app/store";
import {  changeFilterAC, TodolistsDomainType, removeTodolistTC, updateTodolistTC, FilterTodoListType } from './todolists-reducer';
import {  addTaskTC, setTasksTC } from "../../tasks/tasks-reducer";
import { TaskStatuses, TaskType } from "../../../api/tasks-api";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterTodoListType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterTodoListType
    // entityStatus: RequestStatusType

}

export const TodoListWithRedux: FC<PropsType> = React.memo(({ id, title, filter , tasks}) => {
console.log("TodoListWithRedux");

    const dispatch = useAppDispatch();

    const onRevoveTodolistHandler = useCallback(() => {
        dispatch(removeTodolistTC(id));
    }, [id]);

    const addTaskHandler = useCallback((trimedTitle: string) => {
        dispatch(addTaskTC(id, trimedTitle));
    }, [id]);

    const updateTodolistHandler = useCallback((titleInput: string) => {
            dispatch(updateTodolistTC(id, titleInput))
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
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === "Completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

        useEffect(()=>{
            dispatch(setTasksTC(id))
        }, [])

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
                        key={t.id}
                        task={t}
                        todolistId={id}
                    />)}
                <div style={{paddingTop:"10px"}}>
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



