import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from './Task';
import { ReduxStoreProviderDecorator } from './decorator/ReduxStoreProviderDecorator';

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

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', isDone: true},
    },
};