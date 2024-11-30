Overview of the Project
This project is a To-Do List App where you can add and remove tasks (todos). The application uses React, Redux Toolkit, and Next.js to manage the state of todos globally across components.

Real-World Analogy
Think of the app as a task manager for your day-to-day activities. You have a list of tasks that you need to accomplish. Some tasks get added, and some get removed as you complete them. All of this information is managed centrally (just like a task list you might keep on your phone or paper).

Here’s how the project is structured:
App Folder: Contains the main file page.tsx, which renders the entire application.
Application Folder: Contains the store.ts, where we configure Redux and create the Redux store.
Features Folder: Contains the todoSlice.ts which handles the logic for adding/removing todos.
Components Folder: Contains the UI components like Todo.tsx, AddTodo.tsx, and Main.tsx.
# Step 1: store.ts in Application Folder
This file is responsible for setting up the Redux store.ts

## CODE

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todosSice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,  // Here we add our reducer that handles todos
  },
});

export type RootState = ReturnType<typeof store.getState>;  // This type gets the entire state structure
export type AppDispatch = typeof store.dispatch;  // This type gives us the dispatch function


## Explanation:
### Redux store: It's like a central storage where all the data (state) is kept. In this case, the state is about todos (tasks).
### configureStore: This is a function from Redux Toolkit that sets up the store for us.
### todos: todoReducer: We are telling Redux that the todos part of the state is managed by the todoReducer (which is in todoSlice.ts).
### RootState and AppDispatch: These types help TypeScript understand the shape of the state and dispatch function in your app, making it safer and easier to work with.
### Real-World Example: Imagine your task manager app has a central file where it keeps track of all your tasks. This is that central file, and it ensures that your app always knows what tasks exist.

# Step 2: todoSlice.ts in Features Folder
This file manages the todo logic — adding and removing tasks.ts

## CODE

import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [{ id: 1, text: "Hello World" }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo: Todo = {
        id: Date.now(),  // Unique ID for each todo
        text: action.payload,  // Text of the todo passed from the input
      };
      state.todos.push(todo);  // Add the new todo to the state
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);  // Remove the todo by id
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;


## Explanation:

createSlice: This is a Redux Toolkit function that helps create a "slice" of the Redux state. Here, it’s for todos.
addTodo: This action is triggered to add a new todo. It gets the todo text from the user and creates a new todo object with a unique ID.
removeTodo: This action removes a todo by its id.
State Structure: The TodoState holds an array of todos, where each todo is an object with an id and text.
Real-World Example: This part is like the brain of your task manager app. Whenever you add a new task, this brain generates a unique task ID (like assigning a task number) and saves it. If you want to remove a task, this brain will find it by its task number and delete it from your list.

# Step 3: Todo.tsx in Components Folder
This file is responsible for displaying the list of todos and allowing you to remove them.tsx

## CODE

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../application/store"; 
import { removeTodo } from "../features/todo/todosSice";

interface Todo {
  id: number;
  text: string;
}

const Todo: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);  // Get todos from Redux store
  const dispatch = useDispatch();  // To dispatch actions like removeTodo

  return (
    <ul className="list-none">
      {todos.map((todo: Todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Todo;


## Explanation:

### useSelector: This is a hook that allows us to get the state from the Redux store. Here, we are getting the list of todos.
### useDispatch: This hook lets us send actions to the Redux store. Here, it dispatches the removeTodo action when the delete button is clicked.
### Real-World Example: This part is like your task manager showing the list of tasks you need to do. Each task has a "Delete" button, and when you press it, the task gets removed from your list.

# Step 4: AddTodo.tsx in Components Folder
This file allows the user to add new todos.tsx

## CODE

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todosSice';

const AddTodo: React.FC = () => {
  const [input, setInput] = useState('');  // State to hold the text of the new todo
  const dispatch = useDispatch();

  const addTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo(input));  // Dispatch the addTodo action with the input value
    setInput('');  // Clear the input field after adding the todo
  };

  return (
    <form onSubmit={addTodoHandler}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}  // Update input as user types
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;

## Explanation:

### useState: We use this to keep track of the current value the user is typing into the input field.
### addTodoHandler: When the user submits the form, this function is triggered. It dispatches the addTodo action to add the new todo to the list.
### Real-World Example: This is like you entering a new task into your task manager. You type the task into the input field and press "Add Todo," and the task gets added to your task list.

# Step 5: Main.tsx in Components Folder
This file renders the entire app, including the form to add todos and the list of todos.tsx

## CODE

import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Provider } from 'react-redux';
import { store } from '../application/store';

const Main: React.FC = () => {
  return (
    <Provider store={store}>
      <h1>Todo List</h1>
      <AddTodo />  {/* Add new todos */}
      <Todo />  {/* Display list of todos */}
    </Provider>
  );
};

export default Main;

## Explanation:

### Provider: This component makes the Redux store available to all components in the app.
### Rendering AddTodo and Todo: This is where we bring the functionality together. First, you can add new todos with AddTodo, and then view/remove them with Todo.
### Real-World Example: This is like the main screen of your task manager, where you can both add new tasks and view/remove the existing ones.

### Conclusion
This is a basic Todo app using Redux Toolkit to manage state. You have:

A global store that holds the todos.
A slice that defines how to modify the todos (add or remove).
Components like AddTodo and Todo to interact with the user.
With this approach, all your todos are stored centrally in the Redux store, and you can easily add or remove them from any component in the app.

## To sum up:
Redux acts as the central task manager, handling the state (your tasks).
React lets you interact with this state (like adding/removing tasks) through components.
This structure can be expanded as you learn more, adding features like editing tasks, persisting data to a backend, or even filtering tasks. Let me know if you'd like further explanations or assistance with any part of it!
