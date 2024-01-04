import { v1 } from "uuid";
import { TasksStateType, TodolistsType } from "../App";
import { TaskType } from "../TodoList";
import { AddTodolistAC, RemoveTodolistACType } from "./todolists-reducer";

export const tasksReducer = (
    state: TasksStateType,
    action: TaskReducerType
): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return { ...state, [action.payloard.todolistId]: state[action.payloard.todolistId].filter(el => el.id !== action.payloard.taskId) }
        }
        case "ADD-TASK": {
            const newID = v1();
            const newTask: TaskType = {
                id: newID,
                title: action.payloard.title,
                isDone: false,
            };
            return { ...state, [action.payloard.todolistId]: [newTask, ...state[action.payloard.todolistId]] };
        }
        case "UPDATE-TASK-TITLE": {
            return {
                ...state, [action.payloard.todolistId]: state[action.payloard.todolistId]
                    .map((el) => el.id === action.payloard.taskId ? { ...el, title: action.payloard.title } : el)
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.payloard.todolistId]: state[action.payloard.todolistId]
                    .map((t) =>
                        t.id === action.payloard.taskId ? { ...t, isDone: action.payloard.isDone } : t
                    )
            };
        }
        case "ADD-TODOLIST":{
            return  {...state, [action.payloard.todolistId]:[]}
        }
        case "REMOVE-TODOLIST": {
            // const copyState = {...state}
            // delete copyState[action.payloard.id]
            // return copyState
            const {[action.payloard.id] : [] ,...rest } = state
            return rest
        }
        default:
            return state;
    }
};
type TaskReducerType =
    | RemoveTaskACType | AddTaskAC | changeTaskStatusACType | UpdateTitleTaskACType | AddTodolistAC | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payloard: { taskId, todolistId },
    } as const;
};

type AddTaskAC = ReturnType<typeof addTaskAC>;
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payloard: { title, todolistId },
    } as const;
};

type UpdateTitleTaskACType = ReturnType<typeof updateTitleTaskAC>;
export const updateTitleTaskAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "UPDATE-TASK-TITLE",
        payloard: { taskId, title, todolistId },
    } as const;
};

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payloard: { taskId, isDone, todolistId },
    } as const;
};
