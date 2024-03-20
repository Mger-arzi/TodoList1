import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
type EditableSpanProps = {
    callBack: (titleInput: string) => void
    oldTitle: string
    disabled: boolean
}
export const EditableSpan = React.memo((props: EditableSpanProps) => {

    const [titleInput, setTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)



    const onChengeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const activateEditHanlker = () => {
        if(props.disabled)
        return
        setEdit(!edit)
        props.callBack(titleInput)
    }
    return (
        edit
            ?
            <TextField id="outlined-basic" size='small' variant="outlined"
                autoFocus
                onBlur={activateEditHanlker}
                onChange={onChengeHandler}
                value={titleInput} 
                disabled = {props.disabled}/>
                
            :
            <span onDoubleClick={activateEditHanlker}>{props.oldTitle}</span>

    );
});

