import type { Meta, StoryObj } from '@storybook/react';
import React, { ChangeEvent,KeyboardEvent, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { AddItemForm, AddItemFormProos } from './AddItemForm';
import { IconButton, TextField } from '@mui/material';
import { AddCircleSharp } from '@mui/icons-material';

const meta: Meta<typeof AddItemForm> = {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callBack: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: { callBack: action('Button clicked inside form') }
}
export const AddItemFormErrorStory: Story = {
    render : () => <AddItemFormError callBack={action('Button clicked inside form')}/>
}
const AddItemFormError =  (props:AddItemFormProos) => {

    const [titleInput, setTitle] = useState("")
    const [inputError, setInputError] = useState<string | null>("Title is required")


    const addTask = () => {
        let trimedTitle = titleInput.trim()
        if (trimedTitle) {
            props.callBack(trimedTitle)
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
            addTask()
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
            <IconButton onClick={addTask} >
                <AddCircleSharp  color='primary'/>
            </IconButton> 
        
    </div >
    );
};

