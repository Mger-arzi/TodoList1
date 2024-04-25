import React, { ChangeEvent, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from "../editableSpan/EditableSpan";
import { useDispatch } from "react-redux";
import {  tasksThunks } from "./tasks-slice";
import { TaskStatuses, TaskType } from "../../api/tasks-api";
import ListItem from "@mui/material/ListItem";
import { useActions } from "../../utils/useActions/useActions";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
}


export const Task = React.memo((props: TaskPropsType) => {
  const {updateTask ,removeTask} = useActions()

  const chekedChechbox = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    updateTask({ todolistId, taskId, model: { status } })
  }, [])

  const updateTaskCallback = useCallback((todolistId: string, taskId: string, title: string) => {
    updateTask({ todolistId, taskId, model: { title } })
  }, [])

  const removeTaskCallback = useCallback((taskId: string, todolistId: string) => {
    removeTask({todolistId, taskId})
  }, [])


  const onChengeCheckboxStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    chekedChechbox(props.todolistId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New);
  };
  const updateTaskHandler = useCallback((titleInput: string) => {
    updateTaskCallback(props.todolistId, props.task.id, titleInput);
  }, [updateTask, props.todolistId, props.task.id]);



  return (
    <ListItem sx={{
      p: 0,
      justifyContent: 'space-between',
      opacity: props.task.status ? 0.7 : 1,
    }} >
      <div>
        <Checkbox size="small"
          checked={props.task.status === TaskStatuses.Completed}
          onChange={onChengeCheckboxStatusHandler}
          disabled={props.task.entityStatus === "loading"}
        />
        <EditableSpan
          callBack={updateTaskHandler}
          oldTitle={props.task.title}
          disabled={props.task.entityStatus === "loading"}
        />
      </div>

      <IconButton disabled={props.task.entityStatus === "loading"} onClick={() => {
        removeTaskCallback(props.task.id, props.todolistId);
      }} >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
})