import { MyAppBar } from '../AppBar/AppBar';
import Container from '@mui/material/Container';
import { TodolistsList } from '../components/features/TodolistList/TodolistList';
import { TaskType } from '../api/tasks-api';
import LinearProgress from '@mui/material/LinearProgress';
import { useAppSelector } from './store';



export type TasksStateType = {
    [key: string]: TaskType[]
}
export function AppWithRedux() {

    const status = useAppSelector(state => state.app.status)


    return (
        <div className="App">
            {/* <ErrorSnackbar/> */}

            <MyAppBar/>
            {status === "loading" &&   <LinearProgress color="success" />}

            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    );
}