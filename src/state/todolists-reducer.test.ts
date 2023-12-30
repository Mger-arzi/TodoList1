
import { v1 } from 'uuid';
import { TodolistsType } from '../App';
import { addTodolistAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './todolists-reducer';



test('correct todolist should be removed', ()=>{
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistsType> = [
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ]

    // const endState = todolistsReducer(startState , {type: 'REMOVE-TODOLIST', id: todolistID1})
    const endState = todolistsReducer(startState , removeTodolistAC(todolistID1))


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test ('correct todolist should be added', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistsType> = [
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ]
    let newTodolistTitle = "New Todolist"

    const endState = todolistsReducer(startState , addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test ('correct todolist should change its name', ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistsType> = [
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ]
    let newTodolistTitle = "New Todolist"

    const action = {
        type: 'CHANGE_TODOLIST-TITLE',
        id: todolistID2,
        title: newTodolistTitle
    }
    const endState = todolistsReducer(startState , updateTodolistAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})