// TaskItem.tsx
import React, { useState } from 'react'
import { Task } from '../types'
import TaskEditForm from './TaskEditForm'
import { Button } from '@mui/material'

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
    <div>
      {isEditing ? (
        <div>
          <TaskEditForm task={task} onSaveTask={handleSaveTask} onCancelEdit={handleCancelEdit} />
        </div>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <Button variant='outlined' onClick={() => onToggleTask(task.id)}>
            {task.completed ? 'Отменить' : 'Выполнить'}
          </Button>
          <Button variant='outlined' onClick={handleEditClick}>
            Редактировать
          </Button>
          <Button variant='outlined' onClick={() => onDeleteTask(task.id)}>
            Удалить
          </Button>
        </>
      )}
    </div>
  )
}

export default TaskItem
