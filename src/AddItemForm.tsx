import { Button } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { AddCircleSharp, AddCircleTwoTone } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { error } from 'console';

export type AddItemFormProos = {
    callBack: (title: string) => void
}
export const AddItemForm = React.memo ( (props: AddItemFormProos) => {
    
    const [titleInput, setTitle] = useState("")
    const [inputError, setInputError] = useState<string | null>(null)


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
            />
            <IconButton onClick={addTask} >
                <AddCircleSharp  color='primary'/>
            </IconButton> 
        
        {/* { inputError && <div className='error-message'>{inputError}</div> } */}
    </div >
    );
});
