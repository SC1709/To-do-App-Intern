import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import SignUpView from "../../views/SignInView";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebaseConfig";
import Cookies from "js-cookie";

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
      const user = userCredential.user;

      if (auth.currentUser) {
        // Update the display name
        await updateProfile(auth.currentUser, { displayName: name });

        // Fetch the user's ID token
        const idToken = await user.getIdToken();

        // Set the ID token as a cookie
        Cookies.set("access_token", idToken); // Expires in 7 days
        // Cookies.set("user_email", email, { expires: 7 }); // Optional: Store email
        console.log("Access Token Cookie:", Cookies.get("access_token"));
        Cookies.set("user_name", name, { expires: 7 }); // Optional: Store name
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
