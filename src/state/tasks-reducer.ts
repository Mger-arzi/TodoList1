import { v1 } from "uuid";
import {TasksStateType , filterTodoListType } from "../App";
import { TaskType } from "../TodoList";

export const tasksReducer = (
    state: TasksStateType,
    action: TaskReducerType
): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.payloard.todolistId]: state[action.payloard.todolistId].filter(el => el.id !== action.payloard.taskId)}
        }
        case "ADD-TASK": {
            const newID = v1();
            const newTask:TaskType  = {
                id: newID,
                title: action.payloard.title,
                isDone: false,
            };
            return {...state, [action.payloard.todolistId]: [newTask, ...state[action.payloard.todolistId]]};
        }
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
    | RemoveTaskACType | AddTaskAC

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payloard: { taskId, todolistId  },
    } as const;
};

type AddTaskAC = ReturnType<typeof addTaskAC>;
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payloard: { title, todolistId },
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
