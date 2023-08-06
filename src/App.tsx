import React, { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { Task } from './types'

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

  return (
    <div>
      <h1>Список задач</h1>
      <TaskForm onCreateTask={createTask} />
      <TaskList tasks={tasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} />
    </div>
  )
}

export default App
