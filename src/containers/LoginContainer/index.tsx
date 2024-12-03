import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebaseConfig";
import LoginView from "../../views/LoginView";
import Cookies from "js-cookie";



const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

    if (user) {
      console.log("User login successfully !");
      const idToken = await user.getIdToken();
      console.log("User login successful!");
      Cookies.set("access_token", idToken); 
      // Cookies.set("userEmail", email, { expires: 7 }); 
      console.log("Access Token Cookie:", Cookies.get("access_token"));
    }
    
      alert("Login successful!");
      navigate("/todo");
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <LoginView
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};

export default LoginForm;
