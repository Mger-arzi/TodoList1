
import { tasksAction, tasksReducer, tasksThunk, } from '../components/tasks/tasks-reducer'
import { TasksStateType } from '../App'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses, model } from '../api/tasks-api'
import { todolistAction, todolistThunk } from '../components/features/TodolistList/todolists-reducer'
import { action } from '@storybook/addon-actions';


let startState: TasksStateType
export type ActionTypeForTest<T extends (...args: any) => any> = Omit<ReturnType<T>, 'meta'>

beforeEach(() => {

  startState = {
    "todolistID1": [
      {
        id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "",
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1", entityStatus: "idle"
      },
      {
        id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "",
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1", entityStatus: "idle"
      },
      {
        id: v1(), title: 'ReactJS', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "",
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1", entityStatus: "idle"
      },

    ],
    "todolistID2": [
      {
        id: v1(), title: 'Rest API', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "",
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID2", entityStatus: "idle"
      },
      {
        id: v1(), title: 'GraphQL', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "",
        order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID2", entityStatus: "idle"
      },
    ]
  }
})
test('correct task should be deleted from correct array', () => {

  const action: ActionTypeForTest<typeof tasksThunk.removeTask.fulfilled> = {
    type: tasksThunk.removeTask.fulfilled.type,
    payload: {
      todolistId: 'todolistId2',
      taskId: '2'
    }
  }
  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1': [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false }
    ],
    'todolistId2': [
      { id: '1', title: 'bread', isDone: false },
      { id: '3', title: 'tea', isDone: false }
    ]
  })
})


test('correct task should be added to correct array', () => {
  const action: ActionTypeForTest<typeof tasksThunk.addTask.fulfilled> = {
    type: tasksThunk.addTask.fulfilled.type,
    payload: {
      tasks: {
        id: '',
        title: "juce",
        description: "",
        todoListId: "sad",
        order: 1,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: new Date,
        deadline: new Date,
        addedDate: new Date,
        entityStatus: "idle"
      }
    }
  }


  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

  const action: ActionTypeForTest<typeof tasksThunk.updateTask.fulfilled> = {
    type: tasksThunk.updateTask.fulfilled.type,
    payload: {
      todolistId: 'todolistId2',
      taskId: '2',
      model: {
        status: TaskStatuses.New
      }
    }
  }
  const endState = tasksReducer(startState, action)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {

  const action: ActionTypeForTest<typeof tasksThunk.updateTask.fulfilled> = {
    type: tasksThunk.updateTask.fulfilled.type,
    payload: {
      todolistId: 'todolistId2',
      taskId: '1',
      model: {
        title: 'juce'
      }
    }
  }
  const endState = tasksReducer(startState, action)
  expect(endState['todolistId2'][1].title).toBe('juce')
})

test('new array should be added when new todolist is added', () => {
  const action: ActionTypeForTest<typeof todolistThunk.addTodolist.fulfilled> = {
    type: todolistThunk.addTodolist.fulfilled.type,
    payload: {
      todolist: {
        id: 'todolistId3',
        title: 'NEW todolist',
        order: 0,
        addedDate: new Date,
      }
    }
  }
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
  const action: ActionTypeForTest<typeof todolistThunk.removeTodolist.fulfilled> = {
    type: todolistThunk.removeTodolist.fulfilled.type,
    payload: {
      id: 'todolistId2'
    }
  }

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})




test("tasks should be added for todolist", () => {
  const action: ActionTypeForTest<typeof tasksThunk.setTasks.fulfilled> = {
    type: tasksThunk.setTasks.fulfilled.type,
    payload: { tasks: startState["todolistID1"], todolistId: "todolistID" },
  }


  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action
  );

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
});