import React, { useState } from 'react'
import { Task } from '../types'
import { TextField, Button } from '@mui/material'

interface TaskFormProps {
  onCreateTask: (newTask: Task) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      const newTask: Task = { title, description, id: Date.now(), completed: false }
      onCreateTask(newTask)
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id='outlined-basic'
        variant='outlined'
        label='Название задачи'
        placeholder='Введите название задачи'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id='outlined-basic'
        variant='outlined'
        label='Описание задачи'
        placeholder='Введите описание задачи'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type='submit' variant='outlined'>
        Добавить задачу
      </Button>
    </form>
  )
}

export default TaskForm
