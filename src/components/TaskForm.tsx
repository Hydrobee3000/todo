import React, { useState } from 'react'
import { Task } from '../types'

const TaskForm: React.FC<{ onCreateTask: (newTask: Task) => void }> = ({ onCreateTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onCreateTask({ title, description, id: Date.now(), completed: false })
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Введите название задачи' value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder='Введите описание задачи' value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type='submit'>Добавить задачу</button>
    </form>
  )
}

export default TaskForm
