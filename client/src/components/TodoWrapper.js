import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import axios from "axios";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8800/todos").then((res) => {
      setTodos(res.data);
    });
  }, [todos]);

  const addTodo = (todo) => {
    axios.post("http://localhost:8800/todos", {
      id: uuidv4(),
      task: todo,
      completed: 0,
      isEditing: 0,
    });
  };

  const deleteTodo = (id) => {
    axios.post("http://localhost:8800/delete", {
      id: id,
    });
  };

  const toggleComplete = (id, completed) => {
    const statusVal = completed == 0 ? 1 : 0;
    axios.post("http://localhost:8800/toogle", { id: id, status: statusVal });
  };

  const editTodo = (task) => {
    const editVal = task.isEditing == 0 ? 1 : 0;
    axios.post("http://localhost:8800/edit", {
      id: task.id,
      isEditing: editVal,
    });
  };

  const editTask = (value, task) => {
    const editVal = task.isEditing == 0 ? 1 : 0;
    axios.post("http://localhost:8800/update", {
      id: task.id,
      isEditing: 0,
      task: value,
    });
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing == 1 ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
