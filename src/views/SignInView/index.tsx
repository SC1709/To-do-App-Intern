import React from "react";
import Input from "../../components/Base/Input";
import Button from "../../components/Base/Button";

interface SignUpViewProps {
  name: string;
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setName: (value: string) => void;
  setPassword: (value: string) => void;
  handleSignUp: (e: React.FormEvent) => void;
}

const SignUpView: React.FC<SignUpViewProps> = ({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  handleSignUp,
}) => {
  return (
    <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button className="bg-green-500" disabled={!email || !password}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpView;
