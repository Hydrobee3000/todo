import React, { useState } from 'react'
import { Button, CardActions, CardContent, TextField } from '@mui/material'
import { Task } from '../../../../types'
import s from './TaskEditForm.module.scss'

interface TaskEditFormProps {
  task: Task
  onSaveTask: (task: Task) => void
  onCancelEdit: () => void
}

// Форма редактирования существующей задачи

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
      <CardContent className={s.content} data-testid='task-edit-form'>
        <TextField
          className={s.title}
          variant='outlined'
          label='Название задачи'
          placeholder='Введите название задачи'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant='outlined'
          label='Описание задачи'
          placeholder='Введите описание задачи'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={5}
        />
      </CardContent>

      <CardActions className={s.actions}>
        <Button className={s.btn__save} variant='contained' type='button' onClick={handleSubmit}>
          Сохранить
        </Button>
        <Button className={s.btn__cancel} variant='outlined' type='button' onClick={onCancelEdit}>
          Отменить
        </Button>
      </CardActions>
    </>
  )
}

export default TaskEditForm
