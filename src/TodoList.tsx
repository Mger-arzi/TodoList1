import React from 'react';
import { Button } from './Button';

type TaskType = {
	id: number
	title: string
	isDone: boolean
}

type TodoListTypeProps = {
	title: string
	tasks: Array<TaskType>
}


export const TodoList = (props: TodoListTypeProps) => {
	return (
		<div className='TodoList'>
			<div>
				<h3>{props.title}</h3>
				<div>
					<input />
					<Button title='+'/>

				</div>
				<ul>

					{props.tasks.map(task => <li><input type="checkbox"  checked={task.isDone}/> <span>{task.title}</span> </li>) }


					{/* <li><input type="checkbox" checked={props.tasks[0].isDone} /> <span>{props.title}</span></li>
					<li><input type="checkbox" checked={props.tasks[1].isDone} /> <span>{props.title}</span></li>
					<li><input type="checkbox" checked={props.tasks[2].isDone} /> <span>{props.title}</span></li> */}
				</ul>
				<div>
					<Button title='All'/>
					<Button title='Active'/>
					<Button title='Completed'/>
				</div>
			</div>
		</div>
	);
};

