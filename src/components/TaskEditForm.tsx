import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Task } from '../types'
import { Button, TextField } from '@mui/material'

const TaskEditForm: React.FC<{
  task: Task
  onSaveTask: (task: Task) => void
  onCancelEdit: () => void
}> = ({ task, onSaveTask, onCancelEdit }) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveTask({ ...task, title, description })
    onCancelEdit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id='outlined-basic'
        variant='outlined'
        label='Название задачи'
        placeholder='Введите название задачи'
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

      <Button variant='outlined' type='submit'>
        Сохранить
      </Button>
      <Button variant='outlined' type='button' onClick={onCancelEdit}>
        Отменить
      </Button>
    </form>
  )
}

TaskEditForm.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onSaveTask: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
}

export default TaskEditForm
