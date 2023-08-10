import React, { useState } from 'react'
import { Fab, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import useLocalStorageList from './hooks/useLocaleStorageList'
import TaskForm from './components/Task/TaskForms/TaskForm'
import TaskList from './components/Task/TaskList/TaskList'
import { Task } from './types'
import Header from './components/Header/Header'
import TaskFilters from './components/Task/TaskActions/TaskFilters'

const App: React.FC = () => {
  const { state: tasks, setState: setTasks } = useLocalStorageList<Task[]>('tasks', []) // список задач
  const [isCreatingTask, setIsCreatingTask] = useState(false) // создается ли новая задача
  const [showTasks, setShowTasks] = useState<'all' | 'completed' | 'incomplete'>('all') // фильтрация

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

  const handleAddIconClick = () => {
    setIsCreatingTask(!isCreatingTask)
  }

  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    if (showTasks === 'all') return true
    if (showTasks === 'completed' && task.completed) return true
    if (showTasks === 'incomplete' && !task.completed) return true
    return false
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />

      <div style={{ padding: '0 20px', flex: 1, overflowY: 'auto' }}>
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
          <TaskFilters showTasks={showTasks} setShowTasks={setShowTasks} />
        </div>

        {/* Форма добавления новой задачи */}
        {isCreatingTask ? <TaskForm onCreateTask={createTask} onCancelCreate={cancelAddTask} /> : null}

        {/* Список задач */}
        <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} onUpdateTask={updateTask} />
      </div>
    </div>
  )
}

export default App
