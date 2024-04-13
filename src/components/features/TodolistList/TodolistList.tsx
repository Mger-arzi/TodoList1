import React, { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { entityStatusSelector, isLoggenInSelictor, tasksSelector, todolistsSelector, useAppDispatch, useAppSelector } from '../../../app/store';
import { Navigate } from 'react-router-dom';
import { todolistThunk } from './todolists-slice';
import { AddItemForm } from '../../addItemForm/AddItemForm';
import { TodoListWithRedux } from './TodoListWithRedux';

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
    dispatch(todolistThunk.getTodolists())
  }, [])



  const addTodolist = useCallback((title: string) => {
    dispatch(todolistThunk.addTodolist({ title }))
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
                filter={tl.filter}
              />
            </Paper>
          </Grid>
        })
      }
    </Grid>
  </>
}
