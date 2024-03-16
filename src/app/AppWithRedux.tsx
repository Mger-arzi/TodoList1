import { useCallback, useEffect, } from 'react';
// import './App.css';
import { AddItemForm } from '../components/addItemForm/AddItemForm';
import Grid from '@mui/material/Unstable_Grid2';
import { ButtonAppBar } from '../AppBar/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import { TodolistsDomainType, addTodolistTC, getTodolistsTC, } from '../components/features/TodolistList/todolists-reducer';
import { useAppDispatch, useAppSelector } from './store';
import { TodoListWithRedux } from '../components/features/TodolistList/TodoListWithRedux';
import { TaskType } from '../api/tasks-api';
import { TodolistsList } from '../components/features/TodolistList/TodolistList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Menu } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



export type TasksStateType = {
    [key: string]: TaskType[]
}
export function AppWithRedux() {

    console.log("AppWithRedux");
    // const status = useAppSelector(state => state.app.status)



    return (
        <div className="App">
            {/* <ErrorSnackbar/> */}
            <AppBar position="static">
                <Toolbar>

                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {/*     {status === "loading" &&   <LinearProgress color="success" />} */}

            </AppBar>
            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    );
}