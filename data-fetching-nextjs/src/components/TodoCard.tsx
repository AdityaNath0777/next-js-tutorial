import React from "react";

export interface Todo {
  title: string;
  todo: string;
  para: string;
  completed: boolean;
}

interface TodoCardProps {
  todo: Todo;
}

function TodoCard({ todo }: TodoCardProps) {
  return (
    <div className="flex gap-2">
      <div className="left-container">
        <input
          type="checkbox"
          className="bg-gray-50"
          checked={todo.completed}
          onChange={(e) => {}}
        />
      </div>
      <div className="right-container">
        <h2 className="text-2xl font-bold text-gray-100/80">{todo.title}</h2>
        <p className="text-lg font-semibold">{todo.todo}</p>
        <p>{todo.para}</p>
      </div>
    </div>
  );
}

export default TodoCard;
