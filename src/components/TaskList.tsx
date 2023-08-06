import React from 'react'
import { Task } from '../types'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onDeleteTask: (taskId: number) => void
  onToggleTask: (taskId: number) => void
  onUpdateTask: (updatedTask: Task) => void // Добавляем новый пропс
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleTask, onUpdateTask }) => {
  return (
    <div style={{ paddingBottom: '1rem' }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDeleteTask={onDeleteTask} onToggleTask={onToggleTask} onUpdateTask={onUpdateTask} />
      ))}
    </div>
  )
}

export default TaskList
