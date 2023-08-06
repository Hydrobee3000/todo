import React, { useState } from 'react'
import { Task } from '../types'
import { TextField, Button, Divider } from '@mui/material'

interface TaskFormProps {
  onCreateTask: (newTask: Task) => void
  onCancelCreate: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask, onCancelCreate }) => {
  const [title, setTitle] = useState('') // заголовок
  const [description, setDescription] = useState('') // описание

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      // Создание новой задачи и добавление в список задач
      const newTask: Task = { title, description, id: Date.now(), completed: false }
      onCreateTask(newTask)
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginBottom: '3rem' }}>
      <TextField
        style={{ marginBottom: '1rem' }}
        id='outlined-basic'
        variant='outlined'
        label='Название задачи'
        placeholder='Введите название задачи'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        style={{ marginBottom: '1rem' }}
        id='outlined-basic'
        variant='outlined'
        label='Описание задачи'
        placeholder='Введите описание задачи'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
      />

      <div>
        <Button type='submit' variant='contained' style={{ marginLeft: 'auto', marginRight: '1rem', width: '12rem' }}>
          Добавить задачу
        </Button>
        <Button variant='outlined' onClick={onCancelCreate} style={{ width: '7rem' }}>
          Отменить
        </Button>
      </div>
      <Divider style={{ marginTop: '3rem' }} />
    </form>
  )
}

export default TaskForm
