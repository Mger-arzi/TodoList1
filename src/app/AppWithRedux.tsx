import { MyAppBar } from '../AppBar/AppBar';
import Container from '@mui/material/Container';
import { TodolistsList } from '../components/features/TodolistList/TodolistList';
import { TaskType } from '../api/tasks-api';
import LinearProgress from '@mui/material/LinearProgress';
import { useAppDispatch, useAppSelector } from './store';
import { ErrorSnackbar } from '../components/errorSnackbar/ErrorSnackbar';
import { Login } from '../components/features/login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { initializeAppTC } from './app-reducer';


export type TasksStateType = {
    [key: string]: TaskType[]
}
export function AppWithRedux() {

  const status = useAppSelector(state => state.app.status)
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  },[])

if (!isInitialized) {
  return (
    <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%'   }}>
      <CircularProgress />
    </div>
  )
}
    return (
        <div className="App">
            <ErrorSnackbar/>
            <MyAppBar/>
            {status === "loading" &&   <LinearProgress color="success" />}
            <Container fixed>
              <Routes>
                  <Route path={'/'} element={<TodolistsList />}/>
                  <Route path={'/login'} element={<Login/>}/>

                  <Route path={'/404'} element={<h2 style={{ alignItems: 'center' }}>PAGE NOT FOUND</h2>} />
                  <Route path={'*'} element={<Navigate to={'/404'} />} />
              </Routes>
              
            </Container>
        </div>
    );
}