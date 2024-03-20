import { Button } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { AddCircleSharp, AddCircleTwoTone } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { error } from 'console';
import { addTodolistAC } from '../features/TodolistList/todolists-reducer';
import { useDispatch } from 'react-redux';
import { addTaskAC } from '../tasks/tasks-reducer';

export type AddItemFormProos = {
    Item: (trimedTitle:string)=> void
    disabled? : boolean
}
export const AddItemForm = React.memo ( (props:AddItemFormProos) => {


    const [titleInput, setTitle] = useState("")
    const [inputError, setInputError] = useState<string | null>(null)


    const addItem = () => {
        let trimedTitle = titleInput.trim()
        if(props.disabled)
        return
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
    return (
        <div>
            <TextField 
                label="Type value"  
                error = {!!inputError}
                id="outlined-basic" 
                size='small' 
                value={titleInput}
                onChange={onChengeHandler}
                onKeyPress={onKeyPressHandler}
                disabled={props.disabled}
            />
            <IconButton onClick={addItem} disabled = {props.disabled}>
                <AddCircleSharp  color='primary'  />
            </IconButton> 
    </div >
    );
});
