import React, { FC } from 'react';
import { Button } from './Button';
import { filterTodoListType } from './App';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type TodoListTypeProps = {
	title: string
	tasks: Array<TaskType>
	removeTask: (Id: string) => void
	changeFilter: (value: filterTodoListType) => void
   addTask: (title:string) => void

}


export const TodoList: FC<TodoListTypeProps> = ({changeFilter, removeTask, tasks, title, addTask}) => {
	return (
		<div className="TodoList">
			<div>
				<h3>{title}</h3>
				<div>
					<input />
					<Button name="+" onClickHandler={ ()=> {addTask('asd')}}  />
				</div>
				<ul>
					{tasks.map((task) => (
						<li>
							<input type="checkbox" checked={task.isDone} />{" "}
							<span>{task.title}</span>
							<Button
								onClickHandler={() => {
									removeTask(task.id);
								}}
								name={"✖️"}
							/>
						</li>
					))}
				</ul>
				<div>
					<Button onClickHandler={()=> changeFilter("All") } name="All" />
					<Button onClickHandler={()=> changeFilter("Active")} name="Active" />
					<Button onClickHandler={()=> changeFilter("Completed")} name="Completed" />
				</div>
			</div>
		</div>
	);
};

