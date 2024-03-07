import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {combineReducers, createStore, legacy_createStore} from "redux";
import { tasksReducer } from '../state/tasks-reducer';
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import { TaskPriorities, TaskStatuses } from '../api/tasks-api';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "All", addedDate: new Date,
        order : 0},
        {id: "todolistId2", title: "What to buy", filter: "All", addedDate: new Date,
        order : 0}
    ] ,
    tasks: {
        "todolistID1": [
            { id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "", 
            order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1" },
            { id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: new Date, deadline: new Date, description: "", 
            order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1" },
            { id: v1(), title: 'ReactJS', status: TaskStatuses.New, addedDate: new Date, deadline: new Date, description: "", 
            order: 0, priority: TaskPriorities.Low, startDate: new Date, todoListId: "todolistID1" },

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
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType & undefined );


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
