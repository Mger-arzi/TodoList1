import React from 'react';


type ButtonType = {
	name: string
	onClickHandler?: ()=>void
}
export const Button = (props:ButtonType) => {
	return (
			<button style={{margin:"5px", borderRadius: "5px", padding: "5px"}}
			onClick={props.onClickHandler}>{props.name}</button>
	);
};
