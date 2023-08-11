import React, { useState } from 'react'
import { TextField, Button, Divider, Box } from '@mui/material'
import { Task } from '../../../../types'
import s from './TaskCreateForm.module.scss'

interface TaskFormProps {
  isCreatingTask: boolean
  onCreateTask: (newTask: Task) => void
  onCancelCreate: () => void
}

const TaskCreateForm: React.FC<TaskFormProps> = ({ isCreatingTask, onCreateTask, onCancelCreate }) => {
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
    <form onSubmit={handleSubmit} className={s.form}>
      <TextField
        className={s.form__title}
        id='outlined-basic'
        variant='outlined'
        label='Название задачи'
        placeholder='Введите название задачи'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete='off'
      />
      <TextField
        className={s.form__description}
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
        <Button className={s.form__button_add} variant='contained' type='submit'>
          Добавить задачу
        </Button>
        <Button className={s.form__button_cancel} variant='outlined' onClick={onCancelCreate}>
          Отменить
        </Button>
      </Box>

      <Divider className={s.divider} />
    </form>
  )
}

export default TaskCreateForm
