import React, {  FC,  useCallback, useEffect } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Task } from "./Task";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "./state/store";
import { removeTodolistAC, updateTodolistAC, changeFilterAC, TodolistsDomainType } from './state/todolists-reducer';
import { addTaskAC, setTasksTC } from "./state/tasks-reducer";
import { TaskStatuses, TaskType } from "./api/tasks-api";




export const TodoListWithRedux: FC<TodolistsDomainType> = React.memo(({ id, title, filter }) => {
console.log("TodoListWithRedux");

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id]);
    const dispatch = useAppDispatch();

    const onRevoveTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(id));
    }, [id]);

    const addTaskHandler = useCallback((trimedTitle: string) => {
        dispatch(addTaskAC(trimedTitle, id));
    }, [id]);

    const updateTodolistHandler = useCallback((titleInput: string) => {
            dispatch(updateTodolistAC(id, titleInput))
    }, [id]);


    const onAllClickHandler = useCallback(() => {
        dispatch(changeFilterAC("All", id))
    }, [id]);

    const onActiveClickHandler = useCallback(() => {
        dispatch(changeFilterAC("Active", id))

    }, [id]);

    const onComplitedClickHandler = useCallback(() => {
        dispatch(changeFilterAC("Completed", id))

    }, [id]);

    if (filter === "Active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === "Completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

        useEffect(()=>{
            dispatch(setTasksTC(id))
        }, [])
        
    return (

        <div >
            <div>

                <h3>
                    <EditableSpan
                        callBack={updateTodolistHandler}
                        oldTitle={title}
                    />
                    <IconButton onClick={onRevoveTodolistHandler}>
                        <DeleteIcon />
                    </IconButton>
                </h3>

                <AddItemForm Item={addTaskHandler} />

                {tasks.map(t =>
                    <Task
                        // chekedChechbox={chekedChechbox}
                        key={t.id}
                        // removeTask={removeTask}
                        // updateTask={updateTask}
                        task={t}
                        todolistId={id}

                    />)}

                <div >
                    <Button variant={filter === "All" ? "contained" : "text"}
                        onClick={onAllClickHandler}> All
                    </Button>
                    <Button
                        variant={filter === "Active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}
                        color="success"
                    > Active

                    </Button>

                    <Button
                        variant={filter === "Completed" ? "contained" : "text"}
                        color="secondary"
                        onClick={onComplitedClickHandler}
                    >
                        Completed
                    </Button>

                </div>
            </div>
        </div>
    );
});



