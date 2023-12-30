import { TodolistsType } from "../App";

export const todolistsReducer = (state:TodolistsType[], action: TodolistsReducerType):TodolistsType[]=> {
    switch (action.type){
        // setTodolists(todolists.filter(el => el.id !== todolistID))
       // delete tasks[todolistID]
        //setTasks({ ...tasks })
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payloard.id)
        }
        default: return state
    }
}
type TodolistsReducerType  = RemoveTodolistACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id:string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payloard : {id }
    }as const
}