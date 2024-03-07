
import { v1 } from 'uuid';
import { FilterTodoListType, TodolistsDomainType, addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './todolists-reducer';

let todolistID1: string
let todolistID2: string

let startState: Array<TodolistsDomainType>


beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()

    startState = [
        { id: todolistID1, title: 'What to learn', filter: 'All', addedDate: new Date, order: 0 },
        { id: todolistID2, title: 'What to buy', filter: 'All', addedDate: new Date, order: 0 },
    ]

})
test('correct todolist should be removed', () => {

    // const endState = todolistsReducer(startState , {type: 'REMOVE-TODOLIST', id: todolistID1})
    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist"

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist"

    // const action = {
    //     type: 'CHANGE_TODOLIST-TITLE',
    //     id: todolistID2,
    //     title: newTodolistTitle
    // }
    const endState = todolistsReducer(startState, updateTodolistAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct filter of todolist should be changed ', () => {

    let newFilter: FilterTodoListType = "Completed"

    const endState = todolistsReducer(startState, changeFilterAC(newFilter, todolistID2))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})