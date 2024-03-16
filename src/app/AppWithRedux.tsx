import { useCallback, useEffect,  } from 'react';
import './App.css';
import { AddItemForm } from '../components/addItemForm/AddItemForm';
import Grid from '@mui/material/Unstable_Grid2';
import { ButtonAppBar } from '../AppBar/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import { TodolistsDomainType,  addTodolistTC, getTodolistsTC,   } from '../components/todolist/todolists-reducer';
import { useAppDispatch, useAppSelector } from '../state/store';
import { TodoListWithRedux } from '../components/todolist/TodoListWithRedux';
import { TaskType } from '../api/tasks-api';



export type TasksStateType = {
    [key: string]: TaskType[]
}
export function AppWithRedux() {

    console.log("AppWithRedux");

    const todolists = useAppSelector <Array<TodolistsDomainType>>(state => state.todolists)

    const dispatch = useAppDispatch();

    const addTodolist = useCallback((trimedTitle: string) => {
        dispatch(addTodolistTC(trimedTitle))
    }, [dispatch])

    useEffect(( ) => {
        dispatch(getTodolistsTC())
    },[])
    
    return (
        <div className='App'>
            <ButtonAppBar />
            <Container>
                <Grid style={{ padding: '20px' }} container>
                    <AddItemForm  Item = {addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todolists.map(todolist => {
                            return <Grid key={todolist.id}>
                                <Paper style={{ padding: "15px" }} elevation={3}>
                                    <TodoListWithRedux
                                        title={todolist.title}
                                        filter={todolist.filter}
                                        id={todolist.id}
                                        addedDate={new Date}
                                        order={0}
                                        />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
