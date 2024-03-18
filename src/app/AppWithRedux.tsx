import { MyAppBar } from '../AppBar/AppBar';
import Container from '@mui/material/Container';
import { TodolistsList } from '../components/features/TodolistList/TodolistList';
import { TaskType } from '../api/tasks-api';



export type TasksStateType = {
    [key: string]: TaskType[]
}
export function AppWithRedux() {

    console.log("AppWithRedux");
    // const status = useAppSelector(state => state.app.status)


    return (
        <div className="App">
            {/* <ErrorSnackbar/> */}

                {/*     {status === "loading" &&   <LinearProgress color="success" />} */}
            <MyAppBar/>
            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    );
}