import { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'
import AddToDo from './AddToDo'
import ToDoList from './ToDoList'
import storage from './utils/cache'
import { IToDoItem } from './types'

function App() {
  // approach 1
  // const [todos, setTodos] = useState<IToDoItem[]>([])

  // // see: https://react.dev/reference/react/useEffect#specifying-reactive-dependencies
  // useEffect(() => {
  //   const cachedTodos = storage.getCache('todos')
  //   if (cachedTodos && cachedTodos.length) {
  //     setTodos(cachedTodos)
  //   }
  // }, [])

  // approach 2
  const [todos, setTodos] = useState<IToDoItem[]>(() => {
    const cachedTodos = storage.getCache('todos')
    return cachedTodos ? cachedTodos : []
  })

  useEffect(() => {
    storage.setCache('todos', todos)
  }, [todos])

  function handleAddToDo(todo: IToDoItem) {
    const newTodos = [...todos, todo]
    handleListChange(newTodos)
  }

  function handleListChange(todos: IToDoItem[]) {
    setTodos(todos)
  }

  return (
    <div className='app'>
      <Header />
      <AddToDo onAddToDo={handleAddToDo} />
      <ToDoList list={todos} onListChange={handleListChange} />
    </div>
  )
}

export default App
