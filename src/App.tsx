import React, { useState } from 'react'
import useLocalStorageList from './hooks/useLocaleStorageList'
import TaskForm from './components/Task/TaskForms/TaskForm'
import TaskList from './components/Task/TaskList/TaskList'
import { Task } from './types'
import Header from './components/Header/Header'
import TaskActions from './components/Task/TaskActions/TaskActions'
import { Box } from '@mui/material'

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
    <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />

      <Box style={{ padding: '0 20px', flex: 1, overflowY: 'auto' }}>
        {/* Действия задач (добавление, фильтрация) */}
        <TaskActions
          isCreatingTask={isCreatingTask}
          setIsCreatingTask={setIsCreatingTask}
          showTasks={showTasks}
          setShowTasks={setShowTasks}
        />

        {/* Форма добавления новой задачи */}
        <TaskForm isCreatingTask={isCreatingTask} onCreateTask={createTask} onCancelCreate={cancelAddTask} />

        {/* Список задач */}
        <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} onUpdateTask={updateTask} />
      </Box>
    </Box>
  )
}

export default App
