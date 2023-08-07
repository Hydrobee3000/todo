import React, { useState } from 'react'
import { Task } from '../types'
import TaskEditForm from './TaskEditForm'
import { Button, Card, CardActions, CardContent, Typography, Divider, Fab, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

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
    <Card sx={{ minWidth: 275, marginBottom: '3rem', borderRadius: '0.6rem' }}>
      {isEditing ? (
        <div>
          <TaskEditForm task={task} onSaveTask={handleSaveTask} onCancelEdit={handleCancelEdit} />
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <CardContent style={{ marginRight: 'auto', width: '90%' }}>
            <Typography variant='h3' gutterBottom>
              {task.title}
            </Typography>

            <Typography variant='body1' gutterBottom>
              {task.description}
            </Typography>

            <Button variant='outlined' onClick={() => onToggleTask(task.id)} color={task.completed ? 'error' : 'success'}>
              {task.completed ? 'Отменить' : 'Выполнить'}
            </Button>
          </CardContent>

          <CardActions
            style={{
              // borderLeft: '1px solid gray',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '5%',
              padding: ' 0.5rem ',
            }}
          >
            {/* <Button variant='outlined' onClick={() => onToggleTask(task.id)}>
              {task.completed ? 'Отменить' : 'Выполнить'}
            </Button>
            <Button variant='outlined' onClick={handleEditClick}>
              Редактировать
            </Button>
            <Button variant='outlined' onClick={() => onDeleteTask(task.id)}>
              Удалить
            </Button> */}
            <Tooltip title={'Редактировать'} placement='top-end'>
              <Fab
                size='small'
                color='primary'
                aria-label='edit'
                style={{ margin: '0', marginTop: '0.4rem', boxShadow: 'none' }}
                onClick={handleEditClick}
              >
                <EditIcon />
              </Fab>
            </Tooltip>

            <Tooltip title={'Удалить'} placement='bottom-end'>
              <Fab
                size='small'
                color='error'
                aria-label='delete'
                style={{ margin: '0', marginTop: '0.4rem', boxShadow: 'none' }}
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
