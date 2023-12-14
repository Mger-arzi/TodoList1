import React, { ChangeEvent,KeyboardEvent, useState } from 'react';
import { Button } from './Button';
type AddItemFormProos = {
    addItem:( title: string)=> void
}
export const AddItemForm = (props:AddItemFormProos) => {
    const [titleInput, setTitle] = useState("")
    const [inputError, setInputError] = useState<string | null>(null)


    const addTask = () => {
        let trimedTitle = titleInput.trim()
        if (trimedTitle) {
            props.addItem(trimedTitle)
        } else {
            setInputError("Error vasay")
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
        <input value={titleInput}
            onChange={onChengeHandler}
            onKeyPress={onKeyPressHandler}
            className={inputError ? "inputError" : ""}
        />
        <Button name="+" onClickHandler={addTask}
            disabled={!titleInput}
        />
        {inputError && <div className='error-message'>{inputError}</div>}
    </div>
    );
};
