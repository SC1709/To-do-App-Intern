import React from "react";
import LoginForm from "../../containers/LoginContainer";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <LoginForm />
      <p className="text-sm mt-4">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
