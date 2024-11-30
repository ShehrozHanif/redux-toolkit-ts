// import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

// // Define the type for a single todo
// interface Todo {
//   id: string;  // Change type to string for nanoid's output
//   text: string;
// }

// // Define the initial state type
// interface TodoState {
//   todos: Todo[];
// }

// // Initial state
// const initialState: TodoState = {
//   todos: [{ id: nanoid(), text: "Hello World" }],
// };

// const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     // Add todo reducer
//     addTodo: (state, action: PayloadAction<string>) => {
//       const todo: Todo = {
//         id: nanoid(),  // Use nanoid to generate a unique ID
//         text: action.payload,
//       };
//       state.todos.push(todo);
//     },
//     // Remove todo reducer
//     removeTodo: (state, action: PayloadAction<string>) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload);
//     },
//     // Edit todo reducer
//     editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
//       const { id, text } = action.payload;
//       const todo = state.todos.find((todo) => todo.id === id);
//       if (todo) {
//         todo.text = text; // Update the text of the todo
//       }
//     },
//   },
// });

// // Export actions
// export const { addTodo, removeTodo, editTodo } = todoSlice.actions;

// // Export reducer
// export default todoSlice.reducer;



import { createSlice, PayloadAction } from "@reduxjs/toolkit";  // Remove nanoid import

// Define the type for a single todo
interface Todo {
  id: number;
  text: string;
}

// Define the initial state type
interface TodoState {
  todos: Todo[];
}

// Initial state
const initialState: TodoState = {
  todos: [{ id: Date.now(), text: "Hello World" }],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Add todo reducer
    addTodo: (state, action: PayloadAction<string>) => {
      const todo: Todo = {
        id: Date.now(),  // Use Date.now() to generate a unique ID
        text: action.payload,
      };
      state.todos.push(todo);
    },
    // Remove todo reducer
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    // Edit todo reducer
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text; // Update the text of the todo
      }
    },
  },
});

// Export actions
export const { addTodo, removeTodo, editTodo } = todoSlice.actions;

// Export reducer
export default todoSlice.reducer;














// features/todo/todoSlice.ts
// import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

// // Define the type for a single todo
// interface Todo {
//   id: number;
//   text: string;
// }

// // Define the initial state type
// interface TodoState {
//   todos: Todo[];
// }

// // Initial state
// const initialState: TodoState = {
//   todos: [{ id: 1, text: "Hello World" }],
// };

// // Create the todo slice
// export const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     // Add todo reducer
//     addTodo: (state, action: PayloadAction<string>) => {
//       const todo: Todo = {
//         id: Date.now(), // Use a numeric ID
//         text: action.payload,
//       };
//       state.todos.push(todo);
//     },
//     // Remove todo reducer
//     removeTodo: (state, action: PayloadAction<number>) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload);
//     },
//     // Edit todo reducer
//     editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
//       const { id, text } = action.payload;
//       const todo = state.todos.find((todo) => todo.id === id);
//       if (todo) {
//         todo.text = text; // Update the text of the todo
//       }
//     },
//   },
// });

// // Export actions
// export const { addTodo, removeTodo, editTodo } = todoSlice.actions;

// // Export reducer
// export default todoSlice.reducer;



