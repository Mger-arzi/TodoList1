import React, { ChangeEvent, useCallback } from "react";
import { TaskType } from "./TodoList";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

import { EditableSpan } from "./EditableSpan";

type TaskPropsType = {
    chekedChechbox: (
        taskId: string,
        todolistID: string,
        isDone: boolean
    ) => void;
    removeTask: (Id: string, todolistID: string) => void;
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void;
    task: TaskType;
    todolistId: string;
}
export const Task = React.memo((props: TaskPropsType ) => {
    const onChengeCheckboxStatusHandler = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        props.chekedChechbox(props.task.id, props.todolistId, e.currentTarget.checked);
    };
    const updateTaskHandler = useCallback( (titleInput: string) => {
        props.updateTask(props.todolistId , props.task.id, titleInput);
    }, [  props.updateTask,props.todolistId,props.task.id ]);
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
            <IconButton>
                <DeleteIcon color="secondary" onClick={() => {
                    props.removeTask(props.task.id, props.todolistId);
                }}/>
            

            </IconButton>
        </div>
    );
})