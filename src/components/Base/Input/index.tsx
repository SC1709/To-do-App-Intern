import React from "react";

interface InputProps {
  text: string;
  setText: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ text, setText }) => {
  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter a task"
      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;
