import { TodoListType, todolistAPI } from "../../../api/todolist-api";
import { Dispatch } from "redux";
import { setAppStatusAC } from "../../../app/app-reducer";

export const todolistsReducer = (state = initialState, action: TodolistsReducerType): TodolistsDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((el) => el.id !== action.payloard.id);
        case "ADD-TODOLIST":
            return [{ ...action.payloard.todolist, filter: "All" }, ...state]
        case "UPDATE-TODOLIST":
            return state.map((el) => el.id === action.payloard.todolistID ? { ...el, title: action.payloard.titleInput } : el);
        case "CHANGE-TODOLIST-FILTER":
            return state.map((t) => t.id === action.payloard.todolistId ? { ...t, filter: action.payloard.filter } : t);
        case "GET-TODOLISTS":
            return action.todolists.map((el) => ({ ...el, filter: "All" }))
        default:
            return state;
    }
};

// action
export const removeTodolistAC = (id: string) => {
    return { type: "REMOVE-TODOLIST", payloard: { id }, } as const
};
export const updateTodolistAC = (todolistID: string, titleInput: string) => {
    return { type: "UPDATE-TODOLIST", payloard: { todolistID, titleInput }, } as const;
};
export const changeFilterAC = (filter: FilterTodoListType, todolistId: string) => {
    return { type: "CHANGE-TODOLIST-FILTER", payloard: { filter, todolistId } } as const;
};
export const getTodolistsAC = (todolists: Array<TodoListType>) => {
    return { type: "GET-TODOLISTS", todolists } as const
}
export const addTodolistAC = (todolist: TodoListType) => {
    return { type: "ADD-TODOLIST", payloard: { todolist }, } as const;
};

// thunk
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistsReducerType>) => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
        dispatch(removeTodolistAC(todolistId))
    })
}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<TodolistsReducerType>) => {
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
        dispatch(updateTodolistAC(todolistId, title))
    })
}
export const getTodolistsTC = () => (dispatch: Dispatch<TodolistsReducerType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.getTodolists().then((res) => {
        dispatch(getTodolistsAC(res.data))
        dispatch(setAppStatusAC("idle"))

    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistsReducerType>) => {
    dispatch(setAppStatusAC("loading"))

    todolistAPI.createTodolist(title).then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC("idle"))

    })
}

// types

type TodolistsReducerType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof updateTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof getTodolistsAC>
    | ReturnType<typeof setAppStatusAC>

export type FilterTodoListType = "All" | "Active" | "Completed"
export type TodolistsDomainType = TodoListType & { filter: FilterTodoListType }
let initialState: TodolistsDomainType[] = []
