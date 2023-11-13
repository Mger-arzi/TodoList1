import React from 'react';


type ButtonType = {
	title: string
}
export const Button = (props:ButtonType) => {
	return (
			<button style={{margin:"5px", borderRadius: "5px", padding: "5px"}}>{props.title}</button>
	);
};
