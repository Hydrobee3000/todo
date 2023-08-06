import React, { useState } from 'react'
import { Fab, Typography, Tooltip } from '@mui/material'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { Task } from './types'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]) // список задач
  const [isCreatingTask, setIsCreatingTask] = useState(false) // создается ли новая задача
  // фильтрация
  const [showAllTasks, setShowAllTasks] = useState(true)
  const [showCompleted, setShowCompleted] = useState(false)
  const [showIncomplete, setShowIncomplete] = useState(false)

  // Создание новой задачи
  const createTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
    setIsCreatingTask(false)
  }

  // Отмена создания новой задачи
  const cancelAddTask = () => {
    setIsCreatingTask(false)
  }

  // Удаление задачи по id
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  // Переключения статуса выполнения задачи по id
  const toggleTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  // Обновление задачи
  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  // Фильтр показа всех задач
  const handleShowAllTasksChange = () => {
    setShowAllTasks(true)
    setShowCompleted(false)
    setShowIncomplete(false)
  }

  // Фильтр показа выполненных задач
  const handleShowCompletedChange = () => {
    setShowAllTasks(false)
    setShowCompleted(true)
    setShowIncomplete(false)
  }

  // Фильтр показа невыполненных задач
  const handleShowIncompleteChange = () => {
    setShowAllTasks(false)
    setShowCompleted(false)
    setShowIncomplete(true)
  }

  const handleAddIconClick = () => {
    setIsCreatingTask(!isCreatingTask)
  }

  // Фильтрация задач
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

      {/* Добавление новой задачи */}
      {!isCreatingTask ? (
        <>
          <Tooltip title={'Добавить новую задачу'} placement='top-start'>
            <Fab style={{ marginBottom: '1rem' }} color='primary' aria-label='add' onClick={handleAddIconClick}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title={'Отменить создание задачи'} placement='top-start'>
            <Fab style={{ marginBottom: '1rem' }} color='primary' aria-label='cancel' onClick={handleAddIconClick}>
              {<RemoveIcon />}
            </Fab>
          </Tooltip>
          <TaskForm onCreateTask={createTask} onCancelCreate={cancelAddTask} />
        </>
      )}

      {/* Фильтры задач */}
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
          Показать невыполненные задачи
        </label>
      </div>

      {/* Список задач */}
      <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} onUpdateTask={updateTask} />
    </div>
  )
}

export default App
