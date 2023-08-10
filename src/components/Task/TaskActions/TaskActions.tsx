import React from 'react'
import TaskCreateButton from './TaskCreateButton/TaskCreateButton'
import TaskFilters from './TaskFilters/TaskFilters'

interface TaskActionsProps {
  isCreatingTask: boolean
  setIsCreatingTask: React.Dispatch<React.SetStateAction<boolean>>
  showTasks: 'all' | 'completed' | 'incomplete'
  setShowTasks: React.Dispatch<React.SetStateAction<'all' | 'completed' | 'incomplete'>>
}

const TaskActions: React.FC<TaskActionsProps> = ({ isCreatingTask, setIsCreatingTask, showTasks, setShowTasks }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', marginLeft: '1rem' }}>
      {/* Добавление новой задачи */}
      <TaskCreateButton isCreatingTask={isCreatingTask} setIsCreatingTask={setIsCreatingTask} />
      {/* Фильтрация задач */}
      <TaskFilters showTasks={showTasks} setShowTasks={setShowTasks} />
    </div>
  )
}

export default TaskActions
