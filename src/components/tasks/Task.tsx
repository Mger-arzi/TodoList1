import React, { ChangeEvent, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

import { EditableSpan } from "../editableSpan/EditableSpan";
import { useDispatch } from "react-redux";
import {  removeTaskTC, updateTaskTC,  } from "./tasks-reducer";
import { TaskStatuses, TaskType } from "../../api/tasks-api";

type TaskPropsType = {
    task: TaskType;
    todolistId: string;
}




export const Task = React.memo((props: TaskPropsType ) => {

    let dispatch = useDispatch()

    const chekedChechbox = useCallback(( todolistID: string, taskId: string, status:TaskStatuses) => {
        dispatch(updateTaskTC(todolistID, taskId,  {status} ))
    }, [dispatch])

    const updateTask = useCallback((todolistID: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todolistID, taskId, {title:newTitle}))
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistID: string) => {
        dispatch(removeTaskTC(todolistID, id ))
    }, [dispatch])

    
    const onChengeCheckboxStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        chekedChechbox( props.todolistId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed :  TaskStatuses.New);
    };
    const updateTaskHandler = useCallback( (titleInput: string) => {
        updateTask(props.todolistId , props.task.id, titleInput);
    }, [ updateTask, props.todolistId,props.task.id]);



    return (
        <div className={props.task.status ? "task-done" : "task"}>
            <Checkbox size="small" 
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChengeCheckboxStatusHandler}
            />
            <EditableSpan
                callBack={updateTaskHandler}
                oldTitle={props.task.title}
            />
            <IconButton onClick={() => {
                    removeTask(props.task.id, props.todolistId);
                }}>
                <DeleteIcon color="secondary" />
            </IconButton>
        </div>
    );
})