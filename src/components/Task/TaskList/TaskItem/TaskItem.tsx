import React, { useState } from 'react'
import { Card, CardActions, CardContent, Typography, Fab, Tooltip, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import TaskEditForm from '../../TaskForms/TaskEditForm/TaskEditForm'
import { Task } from '../../../../types'
import s from './TaskItem.module.scss'

interface TaskItemProps {
  task: Task
  onDeleteTask: (taskId: number) => void
  onToggleTask: (taskId: number) => void
  onUpdateTask: (updatedTask: Task) => void
}

// Карточка задачи

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
    <Box className={s.container}>
      <Fab
        // className={`${task.completed ? s.btn__complete : s.btn__incomplete}`}
        size='medium'
        aria-label='complete-toggle-button'
        style={{
          marginRight: '2rem',
          backgroundColor: task.completed ? '#019e01 ' : 'white',
          color: task.completed ? 'white' : '',
        }}
        onClick={() => onToggleTask(task.id)}
      >
        <CheckIcon />
      </Fab>

      <Card elevation={2} className={`${s.card} ${task.completed ? s.green : ''}`}>
        {isEditing ? (
          <div>
            <TaskEditForm task={task} onSaveTask={handleSaveTask} onCancelEdit={handleCancelEdit} />
          </div>
        ) : (
          <div className={s.card__wrapper}>
            <CardContent className={s.card__content}>
              <Typography className={s.card__title} variant='h2' gutterBottom>
                {task.title}
              </Typography>

              <Typography className={s.card__description} variant='body2'>
                {task.description}
              </Typography>
            </CardContent>

            <CardActions className={s.card__actions}>
              <Tooltip title={'Редактировать'} placement='top-end'>
                <Fab
                  className={`${s.btn} ${s.btn__edit}`}
                  size='small'
                  color='primary'
                  aria-label='edit'
                  onClick={handleEditClick}
                >
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
    </Box>
  )
}

export default TaskItem
