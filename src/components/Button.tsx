import React, { FC } from 'react';



type ButtonType = {
	name: string
	onClickHandler?: () => void
    disabled?: boolean
    classes?: string
    filter?: string


}
export const MyButton : FC<ButtonType> = ({onClickHandler , name , disabled, classes}) => {
	return (
			<button className={classes} 
                    disabled = {disabled} 
                    style={{margin:"5px", borderRadius: "5px", padding: "5px"}}
			        onClick={onClickHandler}>{name}</button>
	);
};
