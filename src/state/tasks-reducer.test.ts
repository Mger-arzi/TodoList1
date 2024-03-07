
import {  addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTitleTaskAC } from './tasks-reducer'
import { TasksStateType } from '../App'
import { addTodolistAC, removeTodolistAC } from './todolists-reducer'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from '../api/tasks-api'

let startState: TasksStateType 

beforeEach(()=>{
    
startState  = {
    "todolistID1": [
        { id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "", 
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1" },
        { id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "", 
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1" },
        { id: v1(), title: 'ReactJS', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "", 
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1"},

    ],
    "todolistID2": [
        {
            id: v1(), title: 'Rest API', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "",
            order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID2"
        },
        {
            id: v1(), title: 'GraphQL', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "",
            order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID2"
        },
    ]
}
})
test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})


test('correct task should be added to correct array', () => {

    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {

    const action = updateTitleTaskAC('2', 'New Title', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('New Title')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
