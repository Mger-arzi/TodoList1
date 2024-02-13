import React, { ChangeEvent, useCallback } from "react";
import { TaskType } from "./TodoList";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

import { EditableSpan } from "./EditableSpan";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, removeTaskAC, updateTitleTaskAC } from "./state/tasks-reducer";

type TaskPropsType = {
    // chekedChechbox: (taskId: string, todolistID: string , isDone: boolean  ) => void;
    // removeTask: (Id: string, todolistID: string) => void;
    // updateTask: (todolistID: string, taskID: string, newTitle: string) => void;
    task: TaskType;
    todolistId: string;
}




export const Task = React.memo((props: TaskPropsType ) => {

    let dispatch = useDispatch()

    const chekedChechbox = useCallback((taskId: string, todolistID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    }, [dispatch])

    const updateTask = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        dispatch(updateTitleTaskAC(todolistID, taskID, newTitle))
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistID: string) => {
        dispatch(removeTaskAC(id, todolistID))
    }, [dispatch])

    const onChengeCheckboxStatusHandler = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        chekedChechbox(props.task.id, props.todolistId, e.currentTarget.checked);
    };
    const updateTaskHandler = useCallback( (titleInput: string) => {
        updateTask(props.todolistId , props.task.id, titleInput);
    }, [ updateTask, props.todolistId,props.task.id]);



    return (
        <div className={props.task.isDone ? "task-done" : "task"}>
            <Checkbox size="small" 
                checked={props.task.isDone}
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