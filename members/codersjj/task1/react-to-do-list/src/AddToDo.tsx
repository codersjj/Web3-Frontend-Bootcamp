import { useRef, useState } from "react"
import './AddToDo.css'
import { IToDoItem } from '@/types'

export default function AddToDo({ onAddToDo }: { onAddToDo: (toDoItem: IToDoItem) => void }) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const INPUT_ID = "add-to-do-input"

  function handleClick() {
    if (!validate(INPUT_ID)) {
      return
    }

    const toDoItem: IToDoItem = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    }
    onAddToDo(toDoItem)
    setText('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
    validate(INPUT_ID)
  }

  
  /**
   * Validates the input field to ensure it's not empty
   * @param inputId The ID of the input element to validate
   * @returns true if input is valid, false otherwise
   * @see {@link https://dev.to/pujux/native-html5-input-validation-build-better-forms-3363}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity}
   */
  function validate(inputId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement
    const text = input?.value
  
    let res = false
    if (text === '' || text.trim() === '') {
      input.setCustomValidity("Please add a new task");
      res = false
    } else {
      input.setCustomValidity("");
      res = true
    }
  
    input.reportValidity();
    return res
  }

  return (
    <div className="add-to-do">
      <input
        ref={inputRef}
        id={INPUT_ID}
        type="text"
        placeholder="Add a new task"
        autoComplete="off"
        value={text}
        onChange={handleChange}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleClick()
          }
        }}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}