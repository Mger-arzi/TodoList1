import React, { ChangeEvent,KeyboardEvent, useState } from 'react';
import { Button } from './Button';
type AddItemFormProos = {
    id:string
    addTask:(todolistID: string, title: string)=> void
}
export const AddItemForm = (props:AddItemFormProos) => {
    const [titleInput, setTitle] = useState("")
    const [inputError, setInputError] = useState<string | null>(null)

    const ClickAddTask = () => {
        let trimedTitle = titleInput.trim()
        if (trimedTitle) {
            props.addTask(trimedTitle, props.id)
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
            ClickAddTask()
        }
    }
    return (
        <div>
        <input value={titleInput}
            onChange={onChengeHandler}
            onKeyPress={onKeyPressHandler}
            className={inputError ? "inputError" : ""}
        />
        <Button name="+" onClickHandler={ClickAddTask}
            disabled={!titleInput}
        />
        {inputError && <div className='error-message'>{inputError}</div>}
    </div>
    );
};
