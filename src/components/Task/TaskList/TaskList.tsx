import React from 'react'
import { Box } from '@mui/material'
import TaskItem from './TaskItem/TaskItem'
import { Task } from '../../../types'

interface TaskListProps {
  tasks: Task[]
  onDeleteTask: (taskId: number) => void
  onToggleTask: (taskId: number) => void
  onUpdateTask: (updatedTask: Task) => void // Добавляем новый пропс
}

// Список всех задач

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleTask, onUpdateTask }) => {
  return (
    <Box>
      {tasks.map((task) => (
        <div style={{ display: 'flex' }}>
          <p>fds</p>
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onToggleTask={onToggleTask}
            onUpdateTask={onUpdateTask}
          />
        </div>
      ))}
    </Box>
  )
}

export default TaskList
