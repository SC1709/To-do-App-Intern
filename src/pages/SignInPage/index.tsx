import React from "react";
import SignUpForm from "../../containers/SignInContainer";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <SignUpForm />
      <p className="text-sm mt-4">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
