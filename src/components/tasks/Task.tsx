import React, { ChangeEvent, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from "../editableSpan/EditableSpan";
import { TaskStatuses, TaskType } from "../../api/tasks-api";
import ListItem from "@mui/material/ListItem";
import { useActions } from "../../utils/useActions/useActions";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
}


export const Task = React.memo((props: TaskPropsType) => {
  const { updateTask, removeTask } = useActions()


  const updateTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>)=>{
    updateTask({ taskId: props.task.id, todolistId: props.todolistId, 
      model: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New } })
  }, [updateTask,  props.todolistId, props.task.id])
    
  
  const updateTaskTitle = useCallback((titleInput: string) => {
    updateTask({ taskId: props.task.id, todolistId: props.todolistId, model: { title: titleInput } })
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
          onChange={updateTaskStatus}
          disabled={props.task.entityStatus === "loading"}
        />
        <EditableSpan
          callBack={updateTaskTitle}
          oldTitle={props.task.title}
          disabled={props.task.entityStatus === "loading"}
        />
      </div>

      <IconButton disabled={props.task.entityStatus === "loading"} onClick={() => {
        removeTask({ taskId: props.task.id, todolistId: props.todolistId });
      }} >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
})