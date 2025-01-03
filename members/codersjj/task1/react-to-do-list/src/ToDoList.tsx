import './ToDoList.css'
import ToDoItem from "./ToDoItem";
import { IToDoItem } from "./types";

export default function ToDoList({ list, onListChange }: { list: IToDoItem[], onListChange: (list: IToDoItem[]) => void }) {
  function handleItemClick(item: IToDoItem) {
    const curTodoIndex = list.findIndex(({ id }) => id === item.id)
    const todoUpdated: IToDoItem = { ...item, completed: !item.completed }
    const newTodos = list.slice()
    newTodos.splice(curTodoIndex, 1, todoUpdated)
    onListChange(newTodos)
  }

  function handleItemDelete(id: number) {
    // approach 1
    // const curTodoIndex = list.findIndex(item => id === item.id)
    // const newTodos = list.slice()
    // newTodos.splice(curTodoIndex, 1)

    // approach 2
    const newTodos = list.filter(item => item.id !== id)
    
    onListChange(newTodos)
  }

  return (
    <ul className="to-do-list">
      {
        list.map(item => (
          <ToDoItem
            key={item.id}
            item={item}
            onClick={handleItemClick}
            onDelete={handleItemDelete}
          />
        ))
      }
    </ul>
  )
}