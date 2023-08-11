import React from 'react'
import { Fab, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface TaskCreateButtonProps {
  isCreatingTask: boolean
  setIsCreatingTask: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskCreateButton: React.FC<TaskCreateButtonProps> = ({ isCreatingTask, setIsCreatingTask }) => {
  const handleAddIconClick = () => {
    setIsCreatingTask(!isCreatingTask)
  }

  return (
    <Tooltip title={isCreatingTask ? 'Отменить создание задачи' : 'Добавить новую задачу'} placement='right'>
      <Fab
        size='large'
        color={isCreatingTask ? 'error' : 'success'}
        aria-label={isCreatingTask ? 'cancel' : 'add'}
        onClick={handleAddIconClick}
      >
        {isCreatingTask ? <RemoveIcon /> : <AddIcon />}
      </Fab>
    </Tooltip>
  )
}

export default TaskCreateButton
