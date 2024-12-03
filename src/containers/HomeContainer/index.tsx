import React, { useEffect, useState } from "react";
import HomeView from "../../views/HomeView";
import { Todo } from '../../components/model';
import Input from "../../components/Base/Input";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Base/Button";
import Cookies from "js-cookie";


const HomeContainer: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    // const userEmail = Cookies.get("userEmail");
    const accessToken = Cookies.get("access_token");

    if ( !accessToken) {
      alert("User not authenticated. Redirecting to login...");
      navigate("/login");
    }

    // console.log("User Email from Cookie:", userEmail);
    console.log("Access Token from Cookie:", accessToken);
  }, [navigate]);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      Cookies.remove("access_token");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
        <Button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-md"
        >
          Logout
        </Button>
      </div>
      <div className="flex gap-2">
        <Input type="text" value={text} onChange={(e) => setText(e.target.value)} 
          placeholder="Add a new task" />
          <Button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Add
        </Button>
        
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
