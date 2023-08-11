import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, Typography, Fab, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Task } from '../../../../types'
import TaskEditForm from '../../TaskForms/TaskEditForm/TaskEditForm'
import s from './TaskItem.module.scss'

interface TaskItemProps {
  task: Task
  onDeleteTask: (taskId: number) => void
  onToggleTask: (taskId: number) => void
  onUpdateTask: (updatedTask: Task) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleteTask, onToggleTask, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleSaveTask = (updatedTask: Task) => {
    onUpdateTask(updatedTask) // Сохранение изменений редактирования
    setIsEditing(false)
  }

  return (
    <Card className={`${s.card} ${task.completed ? s.green : ''}`}>
      {isEditing ? (
        <div>
          <TaskEditForm task={task} onSaveTask={handleSaveTask} onCancelEdit={handleCancelEdit} />
        </div>
      ) : (
        <div className={s.card__wrapper}>
          <CardContent className={s.card__content}>
            <Typography variant='h4' gutterBottom>
              {task.title}
            </Typography>
            <Typography className={s.card__description} variant='body2' gutterBottom>
              {task.description}
            </Typography>

            <Button color={task.completed ? 'error' : 'success'} variant='outlined' onClick={() => onToggleTask(task.id)}>
              {task.completed ? 'Отменить' : 'Выполнить'}
            </Button>
          </CardContent>

          <CardActions className={s.card__actions}>
            <Tooltip title={'Редактировать'} placement='top-end'>
              <Fab className={`${s.btn} ${s.btn__edit}`} size='small' color='primary' aria-label='edit' onClick={handleEditClick}>
                <EditIcon />
              </Fab>
            </Tooltip>

            <Tooltip title={'Удалить'} placement='bottom-end'>
              <Fab
                className={`${s.btn} ${s.btn__delete}`}
                size='small'
                color='error'
                aria-label='delete'
                onClick={() => onDeleteTask(task.id)}
              >
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </CardActions>
        </div>
      )}
    </Card>
  )
}

export default TaskItem
