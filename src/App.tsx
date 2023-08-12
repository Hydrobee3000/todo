import React, { useState } from 'react'
import { Box } from '@mui/material'
import useLocalStorageList from './hooks/useLocaleStorageList'
import TaskCreateForm from './components/Task/TaskForms/TaskCreateForm/TaskCreateForm'
import TaskActions from './components/Task/TaskActions/TaskActions'
import TaskList from './components/Task/TaskList/TaskList'
import Header from './components/Header/Header'
import { Task } from './types'
import './App.scss'

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

  // Обновление задачи
  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  // Удаление задачи
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  // Переключения статуса выполнения задачи
  const toggleTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    if (showTasks === 'all') return true
    if (showTasks === 'completed' && task.completed) return true
    if (showTasks === 'incomplete' && !task.completed) return true
    return false
  })

  return (
    <Box className='app'>
      <Header />

      <Box className='app__body'>
        {/* Действия задач (добавление, фильтрация) */}
        <TaskActions
          isCreatingTask={isCreatingTask}
          setIsCreatingTask={setIsCreatingTask}
          showTasks={showTasks}
          setShowTasks={setShowTasks}
        />

        {/* Форма добавления новой задачи */}
        <TaskCreateForm isCreatingTask={isCreatingTask} onCreateTask={createTask} onCancelCreate={cancelAddTask} />

        {/* Список задач */}
        <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} onUpdateTask={updateTask} />
      </Box>
    </Box>
  )
}

export default App
