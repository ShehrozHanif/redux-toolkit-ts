"use client"

import React from 'react'
import Todo from './Todo'
import AddTodo from './AddTodo'
import { Provider } from 'react-redux'
import { store } from '../application/store'

function Main() {
  return (
    <Provider store={store}>
     <h1 className='text-4xl font-bold text-center mt-10'>Learn about redux toolkit</h1>
     <AddTodo/>  
     <Todo/>    
    </Provider>
  )
}

export default Main
