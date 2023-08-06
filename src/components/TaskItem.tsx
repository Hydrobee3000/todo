// TaskItem.tsx
import React, { useState } from 'react'
import { Task } from '../types'
import TaskEditForm from './TaskEditForm'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'

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
    onUpdateTask(updatedTask) // Обновляем задачу в компоненте App
    setIsEditing(false)
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      {isEditing ? (
        <div>
          <TaskEditForm task={task} onSaveTask={handleSaveTask} onCancelEdit={handleCancelEdit} />
        </div>
      ) : (
        <>
          <CardContent>
            <Typography variant='h3' gutterBottom>
              {task.title}
            </Typography>
            <Typography variant='body1' gutterBottom>
              {task.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant='outlined' onClick={() => onToggleTask(task.id)}>
              {task.completed ? 'Отменить' : 'Выполнить'}
            </Button>
            <Button variant='outlined' onClick={handleEditClick}>
              Редактировать
            </Button>
            <Button variant='outlined' onClick={() => onDeleteTask(task.id)}>
              Удалить
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  )
}

export default TaskItem
