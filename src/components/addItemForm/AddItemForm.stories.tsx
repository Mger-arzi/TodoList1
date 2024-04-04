import type { Meta, StoryObj } from '@storybook/react';
import React, { ChangeEvent,KeyboardEvent, useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { AddItemForm, AddItemFormProos } from './AddItemForm';
import { IconButton, TextField } from '@mui/material';
import { AddCircleSharp } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addTaskAC } from '../tasks/tasks-reducer';
import { ReduxStoreProviderDecorator } from '../../decorator/ReduxStoreProviderDecorator';

const meta: Meta<typeof AddItemForm> = {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    decorators: [ReduxStoreProviderDecorator],

    tags: ['autodocs'],
    argTypes: {
        Item: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: { Item: action('Button clicked inside form') }
}
export const AddItemFormErrorStory: Story = {
    render : () => <AddItemFormError Item = {action('click')}/>
}
const AddItemFormError =  (props:AddItemFormProos) => {

    const [titleInput, setTitle] = useState("")
    const [inputError, setInputError] = useState<string | null>("Title is required")

    let dispatch = useDispatch()


    // const addTasksHandler = useCallback((trimedTitle: string) => {
    //     const action = addTaskAC(trimedTitle, props.todolistId)
    //     dispatch(action)
    // }, [dispatch])

    const addItem = () => {
        let trimedTitle = titleInput.trim()
        if (trimedTitle) {
            props.Item(trimedTitle)
        } else {
            setInputError("Title is required")
        }
        setTitle("")
    }

    const onChengeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        inputError && setInputError(null)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addItem()
        }
    }
    return(
        <div>
            <TextField 
                label="Type value"  
                error = {!!inputError}
                id="outlined-basic" 
                size='small' 
                value={titleInput}
                onChange={onChengeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <IconButton onClick={addItem} >
                <AddCircleSharp  color='primary'/>
            </IconButton> 
        
    </div >
    );
};

