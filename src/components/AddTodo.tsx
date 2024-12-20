// components/AddTodo.tsx
"use client";

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todosSice'

function AddTodo() {
  const [input, setInput] = useState('') // State to hold the input value
  const dispatch = useDispatch()

  const addTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() !== '') { // Check if the input is not empty
      dispatch(addTodo(input)) // Dispatch the action to add the todo
      setInput('') // Clear the input field after submitting
    }
  }

  return (
    <form onSubmit={addTodoHandler} className='space x-3 mt-12 text-center'>
      <input 
        type="text"
        className='bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
        placeholder='Enter a Todo.....'
        value={input}
        onChange={(e) => setInput(e.target.value)} // Update input state on change
      />
      <button
        type='submit'
        className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
      >
        Add Todo
      </button>
    </form>
  )
}

export default AddTodo



