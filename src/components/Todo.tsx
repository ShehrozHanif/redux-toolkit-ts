"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../application/store"; // Import RootState from your store file
import { removeTodo, editTodo } from "../features/todo/todosSice"; // Ensure the path is correct

// Define the Todo type
interface Todo {
  id: number;
  text: string;
}

const Todo: React.FC = () => {
  // Access the todos array inside the state
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newText, setNewText] = useState<string>("");

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setNewText(todo.text);
  };

  const handleUpdateClick = () => {
    if (editingTodo) {
      dispatch(editTodo({ id: editingTodo.id, text: newText }));
      setEditingTodo(null);
      setNewText("");
    }
  };

  return (
    <>
      <ul className="list-none">
        {todos.map((todo: Todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <div className="text-white">{todo.text}</div>
            <div>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                Remove
              </button>
              <button
                onClick={() => handleEditClick(todo)}
                className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingTodo && (
        <div className="mt-4">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <button
            onClick={handleUpdateClick}
            className="ml-2 text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
          >
            Update
          </button>
        </div>
      )}
    </>
  );
};

export default Todo;







