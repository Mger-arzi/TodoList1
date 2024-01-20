import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
type EditableSpanProps = {
    oldTitle: string
    callBack:(titleInput:string) => void
}
export const EditableSpan =React.memo( (props:EditableSpanProps) => {
    console.log("EditableSpan");
    
    const [titleInput, setTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)
    
    

    const onChengeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const activateEditHanlker = () => {
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
        value={titleInput}/> 
        :
		<span onDoubleClick={activateEditHanlker}>{props.oldTitle}</span>
        
    );
});

