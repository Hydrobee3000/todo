import React from 'react'
import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'
import { Task } from '../../../types'

describe('TaskList', () => {
  const mockTasks: Task[] = [
    { id: 1, title: 'Задача 1', description: 'Описание задачи 1', completed: false },
    { id: 2, title: 'Задача 2', description: 'Описание задачи 2', completed: true },
  ]
  const mockOnDeleteTask = jest.fn()
  const mockOnToggleTask = jest.fn()
  const mockOnUpdateTask = jest.fn()

  test('отображает список задач', () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDeleteTask={mockOnDeleteTask}
        onToggleTask={mockOnToggleTask}
        onUpdateTask={mockOnUpdateTask}
      />
    )

    // Проверяем, что каждая задача отображается на странице
    mockTasks.forEach((task) => {
      const taskTitle = screen.getByText(task.title)
      const taskDescription = screen.getByText(task.description)

      expect(taskTitle).toBeInTheDocument()
      expect(taskDescription).toBeInTheDocument()
    })
  })
})
