import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import SignUpView from "../../views/SignInView";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebaseConfig";

const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      setEmail("");
      setPassword("");
      return;
    }
    try {
      // await createUserWithEmailAndPassword(auth, email, password);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      alert("Sign Up successful!");
      navigate("/todo");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <SignUpView
      name={name}
      email={email}
      password={password}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSignUp={handleSignUp}
    />
  );
};

export default SignUpForm;