
import {  addTaskAC,removeTaskAC, tasksReducer, updateTaskAC, } from '../components/tasks/tasks-reducer'
import { TasksStateType } from '../App'
import { addTodolistAC, removeTodolistAC } from '../components/features/TodolistList/todolists-reducer'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses, model } from '../api/tasks-api'

let startState: TasksStateType 

beforeEach(()=>{
    
startState  = {
    "todolistID1": [
        { id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "", 
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1" , entityStatus: "idle"},
        { id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "", 
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1" , entityStatus: "idle"},
        { id: v1(), title: 'ReactJS', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "", 
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1",entityStatus: "idle"},

    ],
    "todolistID2": [
        {
            id: v1(), title: 'Rest API', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "",
            order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID2",entityStatus: "idle"
        },
        {
            id: v1(), title: 'GraphQL', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "",
            order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID2", entityStatus: "idle"
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

    const action = addTaskAC({
        id:   '' ,
        title: "juce",
        description: "",
        todoListId: "sad",
        order: 1,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: new Date,
        deadline: new Date,
        addedDate:new Date,
        entityStatus: "idle"
})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC('todolistId2' ,'2', model, )

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})


test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: 'todolistId3',
        title: 'NEW todolist',
        order: 0,
        addedDate: new Date,
    })

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
