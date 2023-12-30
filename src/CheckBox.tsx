import { Checkbox } from '@mui/material';
import React, { ChangeEvent } from 'react';
type CheckBoxtype = {
    isDone: boolean
    Callback: (isDone:boolean) => void
        
}
export const CheckBox = (props:CheckBoxtype) => {
    const onChengeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.Callback(e.currentTarget.checked)
    }
    return (
        <div>
            <Checkbox size="small"
                checked={props.isDone}
                onChange={onChengeHandler}
            />
        </div>
    );
};
