import { v1 } from "uuid";
import { TodolistsType, filterTodoListType } from "../App";


let initialState : TodolistsType[] = []

export const todolistsReducer = (
    state = initialState,
    action: TodolistsReducerType
): TodolistsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((el) => el.id !== action.payloard.id);
        }
        case "ADD-TODOLIST": {
            const newTodo: TodolistsType = {
                id: action.payloard.todolistId,
                title: action.payloard.trimedTitle,
                filter: "All",
            };
            return [...state, newTodo];
        }
        case "UPDATE-TODOLIST": {
            return state.map((el) =>el.id === action.payloard.todolistID? { ...el, title: action.payloard.titleInput }: el);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map((t) =>
                t.id === action.payloard.todolistId
                    ? { ...t, filter: action.payloard.value }
                    : t
            );
        }
        default:
            return state;
    }
};
type TodolistsReducerType =
    | RemoveTodolistACType
    | AddTodolistAC
    | UpdateTodolistACType
    | ChangeFilterACType;

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
    value: filterTodoListType,
    todolistId: string
) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payloard: { value, todolistId },
    } as const;
};
