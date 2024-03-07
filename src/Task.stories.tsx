import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { ReduxStoreProviderDecorator } from './decorator/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { stat } from 'fs';
import { Task } from './Task';
import { TaskPriorities, TaskStatuses, TaskType } from './api/tasks-api';

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        // chekedChechbox: action('Status changed inside Task'),
        // updateTask: action('Title changed inside Task'),
        // removeTask: action('Remove Button clicked changed inside Task'),
        todolistId: 'fgdosrg8rgjuh',
        task: {id: '12wsdewfijdei', title: 'JS', status: TaskStatuses.New, deadline: new Date , description: "",
        addedDate: new Date, order: 0, priority:TaskPriorities.Low, startDate: new Date, todoListId: ''},
    },
    decorators: [ReduxStoreProviderDecorator],

    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

const TaskW = () =>{

    let tasks = useSelector <AppRootStateType, TaskType> (state => state.tasks['todolistId1'][0])
    if(!tasks) tasks = {id: '12wsdewfijdei', title: 'DEFAULT TASK',status: TaskStatuses.New, deadline: new Date , description: "",
        addedDate: new Date, order: 0, priority:TaskPriorities.Low, startDate: new Date, todoListId: ''}
    return <Task task={tasks} todolistId={'todolistId1'}/>
        
}
export const TaskReduxStory: Story = {
    render: () => <TaskW />,
}
// export const TaskIsNotDoneStory: Story = {};

// export const TaskIsDoneStory: Story = {
//     args: {
//         task: {id: '12wsdewfijdei2343', title: 'CSS', isDone: true},
//     },
// };
