import React from "react";
import Input from "../../components/Base/Input";
import Button from "../../components/Base/Button";


interface LoginViewProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: (e: React.FormEvent) => void;
}

const LoginView: React.FC<LoginViewProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
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
      <Button className="bg-blue-500" disabled={!email || !password}>
        Login
      </Button>
    </form>
  );
};

export default LoginView;
