import { useEffect, useRef } from 'react';
import './ToDoItem.css'
import { IToDoItem } from "./types";

interface ToDoItemProps {
  item: IToDoItem;
  onClick: (item: IToDoItem) => void;
  onDelete: (id: number) => void;
}

export default function ToDoItem({ item, onClick, onDelete }: ToDoItemProps) {
  const { id, text, completed } = item

  // see: https://react.dev/reference/react/useRef#manipulating-the-dom-with-a-ref
  const inputRef = useRef<HTMLInputElement>(null)

  const inputId = String(id)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.checked = completed
    }
  }, [completed])

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement
    const liElClicked = e.target === e.currentTarget
    if (liElClicked || target.id) {
      onClick(item)
    }
    if (liElClicked) {
      // const inputEl = document.getElementById(inputId)
      // inputEl.checked = !inputEl.checked
      if (inputRef.current) {
        inputRef.current.checked = !inputRef.current.checked
      }
    }
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    onDelete(item.id)
    // e.stopPropagation()
  }

  return (
    <li
      className={`to-do-item ${completed ? 'completed' : ''}`}
      onClick={handleClick}
    >
      <label htmlFor={inputId} className='item-content'>
        <input ref={inputRef} id={inputId} type="checkbox" name="item-checkbox" />
        <span>{text}</span>
      </label>
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}