import React, { FC, useCallback, useEffect } from "react";
import { AddItemForm } from "../../addItemForm/AddItemForm";
import { EditableSpan } from "../../editableSpan/EditableSpan";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Task } from "../../tasks/Task";
import { useSelector } from "react-redux";
import { entityStatusSelector, useAppDispatch, useAppSelector } from "../../../app/store";
import { TodolistsDomainType, removeTodolistTC, updateTodolistTC, FilterTodoListType, todolistAction } from './todolists-reducer';
import { addTaskTC, setTasksTC } from "../../tasks/tasks-reducer";
import { TaskStatuses, TaskType } from "../../../api/tasks-api";
import { RequestStatusType } from "../../../app/app-reducer";
import Box from "@mui/material/Box";


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
  entityStatus: RequestStatusType

}

export const TodoListWithRedux: FC<PropsType> = React.memo(({ id, title, filter, tasks }) => {
  const entityStatus = useAppSelector(entityStatusSelector)

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
    dispatch(todolistAction.changeFilter({ id, filter: "All" }))
  }, [id]);

  const onActiveClickHandler = useCallback(() => {
    dispatch(todolistAction.changeFilter({ id, filter: "Active" }))

  }, [id]);

  const onComplitedClickHandler = useCallback(() => {
    dispatch(todolistAction.changeFilter({ id, filter: "Completed" }))

  }, [id]);

  if (filter === "Active") {
    tasks = tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (filter === "Completed") {
    tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
  }

  useEffect(() => {
    dispatch(setTasksTC(id))
  }, [])

  return (
    <div >
      <div>
        <h3>
          <EditableSpan
            callBack={updateTodolistHandler}
            oldTitle={title}
            disabled={entityStatus === 'loading'}
          />
          <IconButton onClick={onRevoveTodolistHandler} disabled={entityStatus === "loading"} >
            <DeleteIcon />
          </IconButton>
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
            onClick={onAllClickHandler}> All
          </Button>
          <Button
            variant={filter === "Active" ? "contained" : "text"}
            onClick={onActiveClickHandler}
            color="info"
          > Active
          </Button>
          <Button
            variant={filter === "Completed" ? "contained" : "text"}
            color="secondary"
            onClick={onComplitedClickHandler}
          >
            Completed
          </Button>

        </Box>
      </div>
    </div>
  );
});



