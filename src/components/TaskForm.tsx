import React, { useState } from 'react'
import { Task } from '../types'
import { TextField, Button } from '@mui/material'

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
      <TextField
        id='outlined-basic'
        label='Название задачи'
        variant='outlined'
        placeholder='Введите название задачи'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        id='outlined-basic'
        label='Описание задачи'
        variant='outlined'
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
