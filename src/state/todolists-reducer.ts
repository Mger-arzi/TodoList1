import { v1 } from "uuid";
import { TodolistsType } from "../App";

export const todolistsReducer = (state:TodolistsType[], action: TodolistsReducerType):TodolistsType[]=> {
    switch (action.type){
        // setTodolists(todolists.filter(el => el.id !== todolistID))
       // delete tasks[todolistID]
        //setTasks({ ...tasks })
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payloard.id)
        }
        //const newID = v1()
        //const newTodo: TodolistsType = { id: newID, title: trimedTitle, filter: 'All' }
        //setTodolists([newTodo, ...todolists])
        //setTasks({ ...tasks, [newID]: [] })
        case 'ADD-TODOLIST': {
        const newID = v1()
        const newTodo: TodolistsType = { id: newID, title: action.payloard.trimedTitle, filter: 'All' }
            return [...state , newTodo]
        }
        //setTodolists(todolists.map(el => el.id === todolistID ? { ...el, title: titleInput } : el))
        case "UPDATE-TODOLIST" : {
            return state.map(el => el.id === action.payloard.todolistID ? {...el , title: action.payloard.titleInput} : el)
        }
        default: return state
    }
}
type TodolistsReducerType  = RemoveTodolistACType | AddTodolistAC | UpdateTodolistACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id:string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payloard : {id }
    }as const
}

type AddTodolistAC = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (trimedTitle:string) => {
    return{
        type: 'ADD-TODOLIST',
        payloard : { trimedTitle }
    }as const
}

type UpdateTodolistACType = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (todolistID: string, titleInput: string) => {
    return{
        type: 'UPDATE-TODOLIST',
        payloard : { todolistID, titleInput }
    }as const
}