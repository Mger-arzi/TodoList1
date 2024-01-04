import { v1 } from "uuid";
import {TasksStateType , filterTodoListType } from "../App";

export const tasksReducer = (
    state: TasksStateType,
    action: TaskReducerType
): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.payloard.todolistId]: state[action.payloard.todolistId].filter(el => el.id !== action.payloard.taskId)}
        }
        // case "ADD": {
        //     const newID = v1();
        //     const newTodo: TodolistsType = {
        //         id: newID,
        //         title: action.payloard.trimedTitle,
        //         filter: "All",
        //     };
        //     return ;
        // }
        // case "UPDATE": {
        //     return state.map((el) =>el.id === action.payloard.todolistID? { ...el, title: action.payloard.titleInput }: el);
        // }
        // case "CHANGE-TODOLIST-FILTER": {
        //     return state.map((t) =>
        //         t.id === action.payloard.todolistId
        //             ? { ...t, filter: action.payloard.value }
        //             : t
        //     );
        // }
        default:
            return state;
    }
};
type TaskReducerType =
    | RemoveTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payloard: { taskId, todolistId  },
    } as const;
};

type AddTodolistAC = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (trimedTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payloard: { trimedTitle },
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
