import React, { useState } from 'react'
import { Task } from '../types'
import { Button, CardActions, CardContent, TextField, Typography } from '@mui/material'

interface TaskEditFormProps {
  task: Task
  onSaveTask: (task: Task) => void
  onCancelEdit: () => void
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onSaveTask, onCancelEdit }) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveTask({ ...task, title, description }) // Создаем новый объект задачи с обновленными полями и передаем обратно в TaskItem
    onCancelEdit()
  }

  return (
    <>
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
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
      </CardContent>
      <CardActions>
        <Button variant='outlined' type='button' onClick={handleSubmit}>
          Сохранить
        </Button>
        <Button variant='outlined' type='button' onClick={onCancelEdit}>
          Отменить
        </Button>
      </CardActions>
    </>
  )
}

export default TaskEditForm
