import React, { FC } from 'react';
import { filterTodoListType } from './App';


type ButtonType = {
	name: string
	onClickHandler?: () => void

}
export const Button : FC<ButtonType> = ({onClickHandler , name}) => {
	return (
			<button style={{margin:"5px", borderRadius: "5px", padding: "5px"}}
			onClick={onClickHandler}>{name}</button>
	);
};
