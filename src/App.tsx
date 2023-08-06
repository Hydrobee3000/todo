import React, { useState } from 'react'
import { Typography } from '@mui/material'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { Task } from './types'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showAllTasks, setShowAllTasks] = useState(true) // Изменяем начальное состояние на true
  const [showCompleted, setShowCompleted] = useState(false)
  const [showIncomplete, setShowIncomplete] = useState(false)

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

  const handleShowAllTasksChange = () => {
    setShowAllTasks(true)
    setShowCompleted(false)
    setShowIncomplete(false)
  }

  const handleShowCompletedChange = () => {
    setShowAllTasks(false)
    setShowCompleted(true)
    setShowIncomplete(false)
  }

  const handleShowIncompleteChange = () => {
    setShowAllTasks(false)
    setShowCompleted(false)
    setShowIncomplete(true)
  }

  // Фильтрации задач
  const filteredTasks = tasks.filter((task) => {
    if (showAllTasks) return true
    if (showCompleted && task.completed) return true
    if (showIncomplete && !task.completed) return true
    return false
  })

  return (
    <div>
      <Typography variant='h2' gutterBottom>
        Список задач
      </Typography>
      <TaskForm onCreateTask={createTask} />
      <div>
        <label>
          <input type='checkbox' checked={showAllTasks} onChange={handleShowAllTasksChange} />
          Показать все задачи
        </label>
        <label>
          <input type='checkbox' checked={showCompleted} onChange={handleShowCompletedChange} />
          Показать выполненные задачи
        </label>
        <label>
          <input type='checkbox' checked={showIncomplete} onChange={handleShowIncompleteChange} />
          Показать не выполненные задачи
        </label>
      </div>
      <TaskList
        tasks={filteredTasks} // Используем отфильтрованные задачи для отображения
        onDeleteTask={deleteTask}
        onToggleTask={toggleTask}
        onUpdateTask={updateTask}
      />
    </div>
  )
}

export default App
