import { v1 } from "uuid";
import { TodoListType, todolistAPI } from "../api/todolist-api";
import { Dispatch } from "redux";



export type FilterTodoListType = "All" | "Active" | "Completed"

export type TodolistsDomainType = TodoListType & {
    filter: FilterTodoListType,

}

let initialState : TodolistsDomainType[] = []

export const todolistsReducer = (state = initialState, action: TodolistsReducerType): TodolistsDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((el) => el.id !== action.payloard.id);
        }
        case "ADD-TODOLIST": {
                return [{id: action.payloard.todolistId,
                title: action.payloard.trimedTitle,
                filter: "All",
                addedDate: new Date,
                order: 0,
            },
            ...state]
        }
        case "UPDATE-TODOLIST": {
            return state.map((el) =>el.id === action.payloard.todolistID ? { ...el, title: action.payloard.titleInput }: el);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map((t) =>
                t.id === action.payloard.todolistId
                    ? { ...t, filter: action.payloard.value }
                    : t
            );
        }
        case "GET-TODOLISTS":{

            return action.todolists.map((el)=>({...el,filter:"All"}))

        }
        default:
            return state;
    }
};
type TodolistsReducerType = RemoveTodolistACType | AddTodolistAC | UpdateTodolistACType | ChangeFilterACType | getTodolistsACType


export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payloard: { id },
    } as const;
};


export type AddTodolistAC = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (trimedTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payloard: { trimedTitle , todolistId: v1()},
    } as const;
};


type UpdateTodolistACType = ReturnType<typeof updateTodolistAC>;
export const updateTodolistAC = (todolistID: string, titleInput: string) => {
    return {
        type: "UPDATE-TODOLIST",
        payloard: { todolistID, titleInput },
    } as const;
};


type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
export const changeFilterAC = (
    value: FilterTodoListType,
    todolistId: string
) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payloard: { value, todolistId },
    } as const;
};


export type getTodolistsACType = ReturnType<typeof getTodolistsAC>;
export const getTodolistsAC = (todolists: Array<TodoListType>) => {
    return {type: "GET-TODOLISTS", todolists  } as const
}
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists().then((res) => {
        dispatch(getTodolistsAC(res.data))
    })
}