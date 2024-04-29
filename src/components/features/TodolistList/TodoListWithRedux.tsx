import React, { FC, useCallback, useEffect } from "react";
import { AddItemForm } from "../../addItemForm/AddItemForm";
import { EditableSpan } from "../../editableSpan/EditableSpan";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Task } from "../../tasks/Task";
import { entityStatusSelector, useAppDispatch, useAppSelector } from "../../../app/store";
import { FilterTodoListType, todolistsActions, todolistsThunks } from './todolists-slice';
import { TaskStatuses, TaskType } from "../../../api/tasks-api";
import Box from "@mui/material/Box";
import { useActions } from "../../../utils/useActions/useActions";


type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterTodoListType
}

export const TodoListWithRedux: FC<TodoListPropsType> = React.memo(({ id, title, filter, tasks }) => {

  const entityStatus = useAppSelector(entityStatusSelector)

  const { removeTodolist, addTask, updateTodolist, changeFilter, setTasks } = useActions()

  const addTaskHandler = useCallback((trimedTitle: string) => {
    addTask({ todolistId: id, title: trimedTitle });
  }, [id]);

  const updateTodolistTitleHandler = useCallback((title: string) => {
    updateTodolist({ id, title })
  }, [id]);




  if (filter === "Active") {
    tasks = tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (filter === "Completed") {
    tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
  }

  useEffect(() => {
    setTasks(id)
  }, [])

  return (
    <div >
      <div style={{position: "relative"}}>
      <IconButton onClick={() => removeTodolist({ id })} disabled={entityStatus === "loading"} 
      style={{position: "absolute", top: "-14px", right: '-2px'}}>
            <DeleteIcon />
          </IconButton>
        <h3>
          <EditableSpan
            callBack={updateTodolistTitleHandler}
            oldTitle={title}
            disabled={entityStatus === 'loading'}
          />
          
        </h3>
        <AddItemForm Item={addTaskHandler} disabled={entityStatus === 'loading'} />
        {tasks.map(t =>
          <Task
            key={t.id}
            task={t}
            todolistId={id}
          />)}
        <Box style={{ paddingTop: "10px" }} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant={filter === "All" ? "contained" : "text"}
            onClick={() => changeFilter({ id, filter: "All" })}
          > All
          </Button>
          <Button
            variant={filter === "Active" ? "contained" : "text"}
            onClick={() => changeFilter({ id, filter: "Active" })}
            color="info"
          > Active
          </Button>
          <Button
            variant={filter === "Completed" ? "contained" : "text"}
            color="secondary"
            onClick={() => changeFilter({ id, filter: "Completed" })}
          > Completed
          </Button>

        </Box>
      </div>
    </div>
  );
});



