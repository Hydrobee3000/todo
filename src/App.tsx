import React, { useState } from 'react'
import { Fab, Typography, Tooltip, ButtonGroup, Button, AppBar, Toolbar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import useLocalStorageList from './hooks/useLocaleStorageList'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { Task } from './types'

const App: React.FC = () => {
  const { state: tasks, setState: setTasks } = useLocalStorageList<Task[]>('tasks', []) // список задач
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
    <>
      <AppBar position='static' style={{ marginBottom: '2rem' }}>
        <Toolbar style={{ paddingTop: '0.5rem' }}>
          <Typography variant='h2' gutterBottom style={{ fontSize: '3.5rem' }}>
            Список дел
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', marginLeft: '1rem' }}>
          {/* Добавление новой задачи */}
          {!isCreatingTask ? (
            <>
              <Tooltip title={'Добавить новую задачу'} placement='right'>
                <Fab color='success' aria-label='add' onClick={handleAddIconClick}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title={'Отменить создание задачи'} placement='right'>
                <Fab color='error' aria-label='cancel' onClick={handleAddIconClick}>
                  {<RemoveIcon />}
                </Fab>
              </Tooltip>
            </>
          )}

          {/* Фильтры задач */}
          <div style={{ paddingTop: '0.5rem' }}>
            <ButtonGroup variant='outlined' aria-label='outlined button group'>
              <Button
                startIcon={<FilterAltIcon />}
                onClick={handleShowAllTasksChange}
                variant={showAllTasks === true ? 'contained' : 'outlined'}
              >
                Все задачи
              </Button>
              <Button
                startIcon={<FilterAltIcon />}
                onClick={handleShowCompletedChange}
                variant={showCompleted === true ? 'contained' : 'outlined'}
              >
                Выполненные задачи
              </Button>
              <Button
                startIcon={<FilterAltIcon />}
                onClick={handleShowIncompleteChange}
                variant={showIncomplete === true ? 'contained' : 'outlined'}
              >
                Невыполненные задачи
              </Button>
            </ButtonGroup>
          </div>
        </div>

        {/* Форма добавления новой задачи */}
        {isCreatingTask ? <TaskForm onCreateTask={createTask} onCancelCreate={cancelAddTask} /> : null}

        {/* Список задач */}
        <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} onUpdateTask={updateTask} />
      </div>
    </>
  )
}

export default App
