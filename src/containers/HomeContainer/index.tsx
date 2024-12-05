import React, { useEffect, useState } from "react";
import HomeView from "../../views/HomeView";
import { Todo } from '../../components/model';
import Input from "../../components/Base/Input";
import { signOut } from "firebase/auth";
import { auth, firestore } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Base/Button";
import Cookies from "js-cookie";
import { doc, getDoc, setDoc } from "firebase/firestore";

const HomeContainer: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
     // const userEmail = Cookies.get("userEmail");
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      alert("User not authenticated. Redirecting to login...");
      navigate("/login");
    } else {
      // console.log("User Email from Cookie:", userEmail);
      console.log("Access Token from Cookie:", accessToken);
      fetchTodos();
    }
  }, [navigate]);

  const fetchTodos = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("User not authenticated.");
        return;
      }
  
      const userDoc = doc(firestore, "todos", userId);
      const userSnapshot = await getDoc(userDoc);
  
      if (userSnapshot.exists()) {
        const data = userSnapshot.data();
        const storedTodos: Todo[] = data.todos || [];
        setTodos(storedTodos);
      } else {
        console.log("No todos found for this user.");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  

  const saveTodos = async (newTodos: Todo[]) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const userDoc = doc(firestore, "todos", userId);
      await setDoc(userDoc, { todos: newTodos });
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  };

  const handleAdd = () => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setText("");
    }
  };

    // Function to delete a todo
  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      Cookies.remove("access_token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-lg">
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
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
        />
        <Button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Add
        </Button>
      </div>
      <HomeView todos={todos} toggleTodo={toggleTodo} deleteTodo={handleDelete} />
    </div>
  );
};

export default HomeContainer;
