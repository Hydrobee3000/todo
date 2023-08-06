import React, { useState } from 'react'
import { Fab, Tooltip, Typography } from '@mui/material'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { Task } from './types'
import AddIcon from '@mui/icons-material/Add'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showAllTasks, setShowAllTasks] = useState(true)
  const [showCompleted, setShowCompleted] = useState(false)
  const [showIncomplete, setShowIncomplete] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false) // Добавляем состояние для управления видимостью формы

  const createTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
    setShowTaskForm(false) // Скрываем форму после добавления задачи
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
      <Typography variant='h2' gutterBottom style={{ textAlign: 'center' }}>
        Список задач
      </Typography>
      <Tooltip title='Добавить новую задачу' placement='top-start'>
        <Fab style={{ marginBottom: '1rem' }} color='primary' aria-label='add' onClick={() => setShowTaskForm(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>
      {showTaskForm && <TaskForm onCreateTask={createTask} />} {/* Отображаем форму, если showTaskForm равен true */}
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
      <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} onUpdateTask={updateTask} />
    </div>
  )
}

export default App
