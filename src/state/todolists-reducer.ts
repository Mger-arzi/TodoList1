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
        default: return state
    }
}
type TodolistsReducerType  = RemoveTodolistACType | AddTodolistAC

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