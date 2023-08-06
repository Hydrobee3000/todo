import React from 'react'
import { Task } from '../types'

const TaskItem: React.FC<{
  task: Task
  onDeleteTask: (taskId: number) => void
  onToggleTask: (taskId: number) => void
}> = ({ task, onDeleteTask, onToggleTask }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => onToggleTask(task.id)}>{task.completed ? 'Не выполнено' : 'Выполнено'}</button>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
  )
}

export default TaskItem
