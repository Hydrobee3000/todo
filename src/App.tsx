import React, { useState } from 'react'
import { Task } from './types'
import { Typography } from '@mui/material'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const createTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  return (
    <div>
      <Typography variant='h2' gutterBottom>
        Список задач
      </Typography>
      <TaskForm onCreateTask={createTask} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} onUpdateTask={updateTask} />
    </div>
  )
}

export default App
