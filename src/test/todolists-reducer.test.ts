
import { v1 } from 'uuid';
import { FilterTodoListType, TodolistsDomainType, todolistAction, todolistThunk, todolistsReducer } from '../components/features/TodolistList/todolists-reducer';
import { ActionTypeForTest } from './tasks-reducer.test';

let todolistID1: string
let todolistID2: string

let startState: Array<TodolistsDomainType>


beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = [
    { id: todolistID1, title: 'What to learn', filter: 'All', entityStatus: "idle", addedDate: new Date, order: 0 },
    { id: todolistID2, title: 'What to buy', filter: 'All', entityStatus: "idle", addedDate: new Date, order: 0 },
  ]

})
test('correct todolist should be removed', () => {

  // const endState = todolistsReducer(startState , {type: 'REMOVE-TODOLIST', id: todolistID1})
  const action: ActionTypeForTest<typeof todolistThunk.removeTodolist.fulfilled> = {
    type: 'REMOVE-TODOLIST',
    payload: {
      id: todolistID1
    }
  }
  const endState = todolistsReducer(startState, action)


  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {

  let newTodolistTitle = "New Todolist"
  const action: ActionTypeForTest<typeof todolistThunk.addTodolist.fulfilled> = {
    type: 'ADD-TODOLIST',
    payload: {
      todolist: {
        id: 'todolistId3',
        title: 'NEW todolist',
        order: 0,
        addedDate: new Date,
      }
    }
  }
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

  let newTodolistTitle = "New Todolist"
  const action: ActionTypeForTest<typeof todolistThunk.updateTodolist.fulfilled> = {
    type: 'UPDATE-TODOLIST',
    payload: {
      id: todolistID2,
      title: newTodolistTitle,
    }
  }

  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct filter of todolist should be changed ', () => {

  let newFilter: FilterTodoListType = "Completed"

  const endState = todolistsReducer(startState, todolistAction.changeFilter({ id: todolistID2, filter: newFilter }))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
})