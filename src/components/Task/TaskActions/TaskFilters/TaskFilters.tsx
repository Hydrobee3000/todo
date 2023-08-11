import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import s from '../TaskActions.module.scss'

interface TaskFiltersProps {
  showTasks: 'all' | 'completed' | 'incomplete'
  setShowTasks: React.Dispatch<React.SetStateAction<'all' | 'completed' | 'incomplete'>>
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ showTasks, setShowTasks }) => {
  const handleFilterChange = (filter: 'all' | 'completed' | 'incomplete') => {
    setShowTasks(filter)
  }

  return (
    <ButtonGroup
      className={s.task__actions__filters}
      variant='outlined'
      aria-label='outlined button group'
      data-testid='task-filters'
    >
      <Button
        startIcon={<FilterAltIcon />}
        variant={showTasks === 'all' ? 'contained' : 'outlined'}
        onClick={() => handleFilterChange('all')}
      >
        Все задачи
      </Button>

      <Button
        startIcon={<FilterAltIcon />}
        variant={showTasks === 'completed' ? 'contained' : 'outlined'}
        onClick={() => handleFilterChange('completed')}
      >
        Выполненные задачи
      </Button>

      <Button
        startIcon={<FilterAltIcon />}
        variant={showTasks === 'incomplete' ? 'contained' : 'outlined'}
        onClick={() => handleFilterChange('incomplete')}
      >
        Невыполненные задачи
      </Button>
    </ButtonGroup>
  )
}

export default TaskFilters
