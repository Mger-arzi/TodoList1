import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistAC, RemoveTodolistACType, getTodolistsACType } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskType, tasksAPI } from "../api/tasks-api";
import { Dispatch } from "redux";

let initialState: TasksStateType = {}

export const tasksReducer = (state= initialState,action: TaskReducerType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return { ...state, [action.payloard.todolistId]: state[action.payloard.todolistId].filter(el => el.id !== action.payloard.taskId) }
        }
        case "ADD-TASK": {
            const newID = v1();
            const newTask: TaskType = {
                id: newID,
                title: action.payloard.title,
                status: TaskStatuses.New,
                todoListId: action.payloard.todolistId,
                description: "",
                startDate: new Date,
                deadline: new Date,
                addedDate: new Date,
                order: 0,
                priority: TaskPriorities.Low,
            };
            return { ...state, [action.payloard.todolistId]: [newTask, ...state[action.payloard.todolistId]] };
        }
        case "UPDATE-TASK-TITLE": {
            let todolistTasks = state[action.payloard.todolistId];
            let task = todolistTasks.find(t => t.id === action.payloard.taskId);
            if (task) {
                task.title = action.payloard.title;
            }
            return {
                ...state, [action.payloard.todolistId]: state[action.payloard.todolistId]
                    .map(el => el.id === action.payloard.taskId ? { ...el, title: action.payloard.title } : el)
            }
        }
        case "CHANGE-TASK-STATUS": {

            return {
                ...state, [action.payloard.todolistId]: state[action.payloard.todolistId]
                    .map((t) =>
                        t.id === action.payloard.taskId ? { ...t, status: action.payloard.status } : t
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
        case "GET-TODOLISTS":{
            const copyState = {...state}
            action.todolists.forEach((tl)=>{
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS":{
            return {...state,[action.payloard.todolistId]:action.payloard.tasks}  // заменить объект в стейте, предварительно копируя
        }
        default:
            return state;
    }
};
type TaskReducerType = |
    RemoveTaskACType |
    AddTaskAC |
    changeTaskStatusACType |
    UpdateTitleTaskACType |
    AddTodolistAC |
    RemoveTodolistACType | 
    getTodolistsACType |
    SetTasksACType;

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
export const updateTitleTaskAC = (todolistId: string , taskId: string, title: string, ) => {
    return {
        type: "UPDATE-TASK-TITLE",
        payloard: { taskId, title, todolistId },
    } as const;
};


type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    debugger
    return {
        type: "CHANGE-TASK-STATUS",
        payloard: { taskId, status, todolistId },
    } as const;
};

type SetTasksACType = ReturnType<typeof setTasksAC>;
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {  type: "SET-TASKS",payloard: { tasks, todolistId }} as const;
}

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId).then((res) => {
        dispatch(setTasksAC(res.data.items, todolistId))
    })
}