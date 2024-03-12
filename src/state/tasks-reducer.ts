import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistAC, RemoveTodolistACType, getTodolistsACType } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType, tasksAPI } from "../api/tasks-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TaskReducerType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return { ...state, [action.payloard.todolistId]: state[action.payloard.todolistId].filter(el => el.id !== action.payloard.taskId) }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payloard.task.todoListId]:[action.payloard.task ]
                    .concat(state[action.payloard.task.todoListId])
            };
        }
        // case "UPDATE-TASK-TITLE": {
        //     let todolistTasks = state[action.payloard.todolistId];
        //     let task = todolistTasks.find(t => t.id === action.payloard.taskId);
        //     if (task) {
        //         task.status = action.payloard.status;
        //     }
        //     return {
        //         ...state, [action.payloard.todolistId]: state[action.payloard.todolistId]
        //             .map(el => el.id === action.payloard.taskId ? { ...el, title: action.payloard.status } : el)
        //     }
        // }
        case "UPDATE-TASK": {
            debugger
            return {
                ...state, [action.payloard.todolistId]: state[action.payloard.todolistId]
                    .map((t) =>
                        t.id === action.payloard.taskId ? { ...t, ...action.payloard.domainModel } : t
                    )
            };
        }
        case "ADD-TODOLIST": {
            return { ...state, [action.payloard.todolist.id]: [] }
        }
        case "REMOVE-TODOLIST": {
            // const copyState = {...state}
            // delete copyState[action.payloard.id]
            // return copyState
            const { [action.payloard.id]: [], ...rest } = state
            return rest
        }
        case "GET-TODOLISTS": {
            const copyState = { ...state }
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return { ...state, [action.payloard.todolistId]: action.payloard.tasks }  // заменить объект в стейте, предварительно копируя
        }
        default:
            return state;
    }
};
type TaskReducerType = |
    RemoveTaskACType |
    AddTaskAC |
    changeTaskStatusACType |
    AddTodolistAC |
    RemoveTodolistACType |
    getTodolistsACType |
    SetTasksACType;


type SetTasksACType = ReturnType<typeof setTasksAC>;
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return { type: "SET-TASKS", payloard: { tasks, todolistId } } as const;
}

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId).then((res) => {
        dispatch(setTasksAC(res.data.items, todolistId))
    })
}



type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return { type: "REMOVE-TASK", payloard: { taskId, todolistId } } as const;
}
    
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId).then((res) => {
        dispatch(removeTaskAC(todolistId, taskId))
    })
}


type AddTaskAC = ReturnType<typeof addTaskAC>;
export const addTaskAC = ( task: TaskType ) => {
    return { type: "ADD-TASK", payloard: { task }, } as const
};
export const addTaskTC = (todolistId: string , title: string ) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title).then((res) => {
        dispatch(addTaskAC( res.data.data.item ))
    })
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
}

type changeTaskStatusACType = ReturnType<typeof updateTaskAC>;
export const updateTaskAC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType, ) => {
    return { type: "UPDATE-TASK", payloard: {  todolistId ,taskId, domainModel}, } as const;
};


export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => { 
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if(task){
            const APImodel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...domainModel,
            }
            tasksAPI.updateTask(todolistId, taskId, APImodel).then((res) => {
                dispatch(updateTaskAC(todolistId, taskId , domainModel))
            })
        }
    }








//     type UpdateTitleTaskACType = ReturnType<typeof updateTitleTaskAC>;
// export const updateTitleTaskAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
//     return {
//         type: "UPDATE-TASK-TITLE",
//         payloard: { taskId,todolistId , status },
//     } as const;
// };
// export const updateTitleTaskTC = (todolistId: string, taskId: string, status: TaskStatuses) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType) => { 
//         const task = getState().tasks[todolistId].find(t => t.id === taskId)
//         if(task){
//             const model: UpdateTaskModelType = {
//                 title: task.title,
//                 description: task.description,
//                 status: status,
//                 priority: task.priority,
//                 startDate: task.startDate,
//                 deadline: task.deadline,
//             }
//             tasksAPI.updateTask(todolistId, taskId, model).then((res) => {
//                 dispatch(updateTitleTaskAC(todolistId, taskId, status))
//             })
//         }
//     }