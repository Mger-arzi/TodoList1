import { TasksStateType } from "../App"
import { tasksReducer } from "../components/tasks/tasks-reducer"
import { TodolistsDomainType, addTodolistAC, todolistsReducer } from "../components/features/TodolistList/todolists-reducer"


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistsDomainType> = []

    const action = addTodolistAC({
        id: 'todolistId',
        title: 'What to learn',
        order: 0,
        addedDate: new Date,
    })

    const endTasksState = tasksReducer(startTasksState, action)
    
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
    
    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payloard.todolist.id)
    expect(idFromTodolists).toBe(action.payloard.todolist.id)
})