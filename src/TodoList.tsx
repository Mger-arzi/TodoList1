import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import { filterTodoListType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

type TodoListTypeProps = {
	id: string;
	title: string;
	tasks: Array<TaskType>;
	removeTask: (Id: string, todolistID: string) => void;
	changeFilter: (value: filterTodoListType, todolistId: string) => void;
	addTask: (todolistID: string, title: string) => void;
	chekedChechbox: (
		taskId: string,
		todolistID: string,
		isDone: boolean
	) => void;
	removeTodolist: (todolistID: string) => void;
	filter: string;
	updateTask: (todolistID: string, taskID: string, newTitle: string) => void;
	updateTodolist: (todolistID: string, trimedTitle: string) => void;
};

export const TodoList: FC<TodoListTypeProps> = ({
	changeFilter,
	id,
	removeTask,
	tasks,
	title,
	addTask,
	filter,
	chekedChechbox,
	removeTodolist,
	updateTask,
	updateTodolist,
}) => {
	const onAllClickHandler = () => {
		changeFilter("All", id);
	};
	const onActiveClickHandler = () => {
		changeFilter("Active", id);
	};
	const onComplitedClickHandler = () => {
		changeFilter("Completed", id);
	};
	const onRevoveTodolistHandler = () => {
		removeTodolist(id);
	};

	const addTaskHandler = (trimedTitle: string) => {
		addTask(trimedTitle, id);
	};

	const updateTodolistHandler = (titleInput: string) => {
		updateTodolist(id, titleInput);
	};

	return (
		<div className="TodoList">
			<div>
				<h3>
					<EditableSpan
						callBack={updateTodolistHandler}
						oldTitle={title}
					/>
					<Button name="X" onClickHandler={onRevoveTodolistHandler} />{" "}
				</h3>

				<AddItemForm callBack={addTaskHandler} />

				<ul className="list">
					{tasks.map((t) => {
						const onChengeCheckboxStatusHandler = (
							e: ChangeEvent<HTMLInputElement>
						) => {
							chekedChechbox(t.id, id, e.currentTarget.checked);
						};
						const updateTaskHandler = (titleInput: string) => {
							updateTask(id, t.id, titleInput);
						};
						return (
							<li className={t.isDone ? "task-done" : "task"}>
								<input
									type="checkbox"
									checked={t.isDone}
									onChange={onChengeCheckboxStatusHandler}
								/>

								<EditableSpan
									callBack={updateTaskHandler}
									oldTitle={t.title}
								/>
								<Button
									onClickHandler={() => {
										removeTask(t.id, id);
									}}
									name={"✖️"}
								/>
							</li>
						);
					})}
				</ul>

				<div className="btn-container">
					<Button
						onClickHandler={onAllClickHandler}
						name="All"
						classes={filter === "All" ? "btn-active" : "btn"}
						filter="All"
					/>
					<Button
						onClickHandler={onActiveClickHandler}
						name="Active"
						filter="Active"
						classes={filter === "Active" ? "btn-active" : "btn"}
					/>
					<Button
						onClickHandler={onComplitedClickHandler}
						name="Completed"
						classes={filter === "Completed" ? "btn-active" : "btn"}
						filter="Completed"
					/>
				</div>
			</div>
		</div>
	);
};
