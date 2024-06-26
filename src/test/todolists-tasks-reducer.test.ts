import { TasksStateType } from "../App"
import { tasksReducer } from "../components/tasks/tasks-slice"
import { TodolistsDomainType, todolistsActions, todolistsReducer } from "../components/features/TodolistList/todolists-slice"
import { todolistsThunks } from '../components/features/TodolistList/todolists-slice';
import { ActionTypeForTest } from "./tasks-reducer.test";


test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistsDomainType> = []
  const action: ActionTypeForTest<typeof todolistsThunks.addTodolist.fulfilled> = {

    type: 'ADD-TODOLIST',
    payload: {
      todolist: {
        id: 'todolistId',
        title: 'What to learn',
        order: 0,
        addedDate: new Date,
      }
    }
  }
  const endTasksState = tasksReducer(startTasksState, action)

  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})

