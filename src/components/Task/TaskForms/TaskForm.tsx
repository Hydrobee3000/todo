import React, { useState } from 'react'
import { Task } from '../../../types'
import { TextField, Button, Divider, Box } from '@mui/material'

interface TaskFormProps {
  isCreatingTask: boolean
  onCreateTask: (newTask: Task) => void
  onCancelCreate: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({ isCreatingTask, onCreateTask, onCancelCreate }) => {
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

  // Не отображаем форму
  if (!isCreatingTask) {
    return null
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
        autoComplete='off'
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

      <Box>
        <Button
          type='submit'
          variant='contained'
          style={{ backgroundColor: '#019e01', marginLeft: 'auto', marginRight: '1rem', width: '12rem' }}
        >
          Добавить задачу
        </Button>
        <Button variant='outlined' onClick={onCancelCreate} style={{ borderColor: 'red', color: 'red', width: '7rem' }}>
          Отменить
        </Button>
      </Box>

      <Divider style={{ marginTop: '3rem' }} />
    </form>
  )
}

export default TaskForm
