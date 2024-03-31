import React, { FC, useCallback, } from "react";
import { EditableSpan } from "./components/editableSpan/EditableSpan";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Task } from "./components/tasks/Task";
import { TaskStatuses, TaskType } from "./api/tasks-api";
import { FilterTodoListType } from "./components/features/TodolistList/todolists-reducer";


type TodoListTypeProps = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (Id: string, todolistID: string) => void;
  changeFilter: (value: FilterTodoListType, todolistId: string) => void;
  addTask: (todolistID: string, title: string) => void;
  chekedChechbox: (
    taskId: string,
    todolistID: string,
    status: TaskStatuses
  ) => void;
  removeTodolist: (todolistID: string) => void;
  filter: string;
  updateTask: (todolistID: string, taskID: string, newTitle: string) => void;
  updateTodolist: (todolistID: string, trimedTitle: string) => void;
};



export const TodoList: FC<TodoListTypeProps> = React.memo(({
  changeFilter,
  id,
  tasks,
  title,
  filter,
  removeTodolist,
  updateTodolist,
}) => {




  const onAllClickHandler = useCallback(() => {
    changeFilter("All", id);
  }, [changeFilter, id]);

  const onActiveClickHandler = useCallback(() => {
    changeFilter("Active", id);
  }, [changeFilter, id]);

  const onComplitedClickHandler = useCallback(() => {
    changeFilter("Completed", id);
  }, [changeFilter, id]);

  const onRevoveTodolistHandler = useCallback(() => {
    removeTodolist(id);
  }, [removeTodolist, id]);



  const updateTodolistHandler = useCallback((titleInput: string) => {
    updateTodolist(id, titleInput);
  }, [updateTodolist, id]);

  let filterTodoList = tasks
  if (filter === "Active") {
    filterTodoList = tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (filter === "Completed") {
    filterTodoList = tasks.filter(t => t.status === TaskStatuses.Completed)
  }

  return (
    <div >
      <div>
        <h3>
          <EditableSpan
            callBack={updateTodolistHandler}
            oldTitle={title}
            disabled={true}
          />
          <IconButton onClick={onRevoveTodolistHandler}>
            <DeleteIcon />
          </IconButton>
        </h3>


        {filterTodoList.map(t =>
          <Task
            key={t.id}
            task={t}
            todolistId={id}

          />)}

        <div >
          <Button variant={filter === "All" ? "contained" : "text"}
            onClick={onAllClickHandler}> All
          </Button>
          <Button
            variant={filter === "Active" ? "contained" : "text"}
            onClick={onActiveClickHandler}
            color="success"
          > Active

          </Button>

          <Button
            variant={filter === "Completed" ? "contained" : "text"}
            color="secondary"
            onClick={onComplitedClickHandler}
          >
            Completed
          </Button>

        </div>
      </div>
    </div>
  );
});



