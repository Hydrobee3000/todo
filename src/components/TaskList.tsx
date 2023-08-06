import React from 'react'
import TaskItem from './TaskItem'
import { Task } from '../types'

const TaskList: React.FC<{
  tasks: Task[]
  onDeleteTask: (taskId: number) => void
  onToggleTask: (taskId: number) => void
}> = ({ tasks, onDeleteTask, onToggleTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDeleteTask={onDeleteTask} onToggleTask={onToggleTask} />
      ))}
    </div>
  )
}

export default TaskList
