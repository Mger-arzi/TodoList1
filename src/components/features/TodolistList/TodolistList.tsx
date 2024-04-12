import React, { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { entityStatusSelector, isLoggenInSelictor, tasksSelector, todolistsSelector, useAppDispatch, useAppSelector } from '../../../app/store';
import { TasksStateType } from '../../../app/AppWithRedux';
import { FilterTodoListType, TodolistsDomainType, addTodolistTC, getTodolistsTC, removeTodolistTC, todolistAction, updateTodolistTC } from './todolists-reducer';
import { addTask, removeTaskTC, tasksThunk, updateTaskTC } from '../../tasks/tasks-reducer';
import { TaskStatuses } from '../../../api/tasks-api';
import { AddItemForm } from '../../addItemForm/AddItemForm';
import { TodoListWithRedux } from './TodoListWithRedux';
import { Navigate } from 'react-router-dom';

export const TodolistsList: React.FC = () => {

  const todolists = useAppSelector(todolistsSelector)
  const tasks = useAppSelector(tasksSelector)
  const entityStatus = useAppSelector(entityStatusSelector)
  const isLoggenIn = useAppSelector(isLoggenInSelictor)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggenIn) {
      return
    }
    dispatch(getTodolistsTC())
  }, [])

  const removeTask = useCallback(function (id: string, todolistId: string) {
    const thunk = removeTaskTC(id, todolistId)
    dispatch(thunk)
  }, [])

  const addTask = useCallback(function (title: string, todolistId: string) {
    dispatch(tasksThunk.addTask({todolistId, title} ))
  }, [])

  const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    const thunk = updateTaskTC(todolistId, id, { status })
    dispatch(thunk)
  }, [])

  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    const thunk = updateTaskTC(todolistId, id, { title: newTitle })
    dispatch(thunk)
  }, [])

  const changeFilter = useCallback(function (filter: FilterTodoListType, id: string) {
    dispatch(todolistAction.changeFilter({ id, filter }))
  }, [])

  const removeTodolist = useCallback(function (id: string) {
    const thunk = removeTodolistTC(id)
    dispatch(thunk)
  }, [])

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    const thunk = updateTodolistTC(id, title)
    dispatch(thunk)
  }, [])

  const addTodolist = useCallback((title: string) => {
    const thunk = addTodolistTC(title)
    dispatch(thunk)
  }, [])

  if (!isLoggenIn) {
    return <Navigate to={'/login'} />
  }
  return <>
    <Grid container style={{ padding: '20px', marginBottom: "40px" }}>
      <AddItemForm Item={addTodolist} disabled={entityStatus === "loading"} />
    </Grid>
    <Grid container spacing={3}>
      {
        todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id]

          return <Grid style={{ marginRight: '15px' }} item key={tl.id}>
            <Paper style={{ padding: '10px' }}>
              <TodoListWithRedux
                id={tl.id}
                title={tl.title}
                tasks={allTodolistTasks}
                entityStatus={tl.entityStatus}

                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={tl.filter}
                removeTodolist={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
              />
            </Paper>
          </Grid>
        })
      }
    </Grid>
  </>
}
