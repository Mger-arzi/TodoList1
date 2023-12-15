import React, { ChangeEvent, useState } from 'react';

type EditableSpanProps = {
    oldTitle: string
    callBack:(titleInput:string) => void
}
export const EditableSpan = (props:EditableSpanProps) => {

    const [titleInput, setTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)
    console.log(titleInput);
    

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
        <input autoFocus onBlur={activateEditHanlker} onChange={onChengeHandler} value={titleInput} />
        :
		<span onDoubleClick={activateEditHanlker}>{props.oldTitle}</span>
        
    );
};

