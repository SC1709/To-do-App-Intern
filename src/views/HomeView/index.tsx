import React from "react";
import { Todo } from '../../components/model';
import Button from "../../components/Base/Button";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const HomeView: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <div className="mt-6 space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg shadow"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="mr-2 w-4 h-3"
          />
          <span
              className={`${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
            {todo.text}
          </span>
          <Button
            onClick={() => deleteTodo(todo.id)} 
            className="bg-red-600 shadow hover:bg-red-700"
            disabled={!todo.completed} 
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default HomeView;
