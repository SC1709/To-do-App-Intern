import React, { useState } from "react";
import HomeView from "../../views/HomeView";
import { Todo } from '../../components/model';
import Input from "../../components/Base/Input";
import AddButton from "../../components/Base/AddButton";


const HomeContainer: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState(""); 

  const handleAdd = () => {
    if (text.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: text.trim(), completed: false },
      ]);
      setText(""); 
    }
  };

  // Function to delete a todo
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to toggle a todo's completion status
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Todo App
      </h1>
      <div className="flex gap-2">
        <Input text={text} setText={setText} />
        <AddButton onAdd={handleAdd} />
      </div>
      <HomeView
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={handleDelete}
      />
    </div>
  );
};

export default HomeContainer;
