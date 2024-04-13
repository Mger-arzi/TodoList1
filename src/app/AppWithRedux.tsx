import { MyAppBar } from '../AppBar/AppBar';
import Container from '@mui/material/Container';
import { TodolistsList } from '../components/features/TodolistList/TodolistList';
import { TaskType } from '../api/tasks-api';
import LinearProgress from '@mui/material/LinearProgress';
import { appStatusSelector, isInitializedSelector, useAppDispatch, useAppSelector } from './store';
import { ErrorSnackbar } from '../components/errorSnackbar/ErrorSnackbar';
import { Login } from '../components/features/login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { appAction, initializeAppTC } from './app-slice';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline'

export type TasksStateType = {
  [key: string]: TaskType[]
}
export function AppWithRedux() {

  const status = useAppSelector(appStatusSelector)
  const isInitialized = useAppSelector(isInitializedSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    debugger
    dispatch(initializeAppTC())
  }, [])

  type ThemeMode = 'dark' | 'light'
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#087a62',
      },
      secondary: {
        main: '#7f3136',
      },

    },
  })


  const changeModeHandler = () => {
    setThemeMode(themeMode == 'light' ? 'dark' : 'light')
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorSnackbar />
      <MyAppBar changeModeHandler={changeModeHandler} />
      {status === "loading" && <LinearProgress color="success" />}
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodolistsList />} />
          <Route path={'/login'} element={<Login />} />

          <Route path={'/404'} element={<h2 style={{ alignItems: 'center' }}>PAGE NOT FOUND</h2>} />
          <Route path={'*'} element={<Navigate to={'/404'} />} />
        </Routes>

      </Container>
    </ThemeProvider>

  );
}