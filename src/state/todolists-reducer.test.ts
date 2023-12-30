
import { v1 } from 'uuid';
import { TodolistsType } from '../App';



test('correct todolist should be removed', ()=>{
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistsType> = [
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState , {type: 'REMOVE-TODOLIST', id: todolistID1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})