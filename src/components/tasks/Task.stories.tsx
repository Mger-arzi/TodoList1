import type {Meta, StoryObj} from '@storybook/react';
import { ReduxStoreProviderDecorator } from '../../decorator/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../app/store';
import { Task } from './Task';
import { TaskPriorities, TaskStatuses, TaskType } from '../../api/tasks-api';

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        todolistId: 'fgdosrg8rgjuh',
        task: {id: '12wsdewfijdei', title: 'JS', status: TaskStatuses.New, deadline: new Date , description: "",
        addedDate: new Date, order: 0, priority:TaskPriorities.Low, startDate: new Date, todoListId: '', entityStatus: "idle"},
    },
    decorators: [ReduxStoreProviderDecorator],

    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

const TaskW = () =>{

    let tasks = useSelector <AppRootStateType, TaskType> (state => state.tasks ['todolistId1'] && state.tasks['todolistId1'][0] )
    if(!tasks) tasks = {id: '12wsdewfijdei', title: 'DEFAULT TASK',status: TaskStatuses.New, deadline: new Date , description: "",
        addedDate: new Date, order: 0, priority:TaskPriorities.Low, startDate: new Date, todoListId: '', entityStatus: "idle"}
    return <Task  task={tasks} todolistId={'todolistId1'}/>
        
}
export const TaskReduxStory: Story = {
    render: () => <TaskW />,
}
