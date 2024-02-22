import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { ReduxStoreProviderDecorator } from './decorator/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TaskType } from './TodoListWithRedux';
import { stat } from 'fs';
import { Task } from './Task';

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        // chekedChechbox: action('Status changed inside Task'),
        // updateTask: action('Title changed inside Task'),
        // removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
        todolistId: 'fgdosrg8rgjuh'
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
    if(!tasks) tasks = {id: '12wsdewfijdei', title: 'DEFAULT TASK', isDone: false}
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
