import React, { FC } from 'react';
import { filterTodoListType } from './App';


type ButtonType = {
	name: string
	onClickHandler?: () => void
    disabled?: boolean
    classes?: string

}
export const Button : FC<ButtonType> = ({onClickHandler , name , disabled,classes}) => {
	return (
			<button className={classes} 
                    disabled = {disabled} 
                    style={{margin:"5px", borderRadius: "5px", padding: "5px"}}
			onClick={onClickHandler}>{name}</button>
	);
};
