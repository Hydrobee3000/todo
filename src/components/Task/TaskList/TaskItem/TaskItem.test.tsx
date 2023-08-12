import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import TaskItem from './TaskItem'
import { Task } from '../../../../types'

describe('TaskItem', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Задача 1',
    description: 'Описание задачи 1',
    completed: false,
  }
  const mockOnDeleteTask = jest.fn()
  const mockOnToggleTask = jest.fn()
  const mockOnUpdateTask = jest.fn()

  test('отображает задачу', () => {
    render(
      <TaskItem task={mockTask} onDeleteTask={mockOnDeleteTask} onToggleTask={mockOnToggleTask} onUpdateTask={mockOnUpdateTask} />
    )
    // Ожидаем, что задача отображается
    const taskTitle = screen.getByText(mockTask.title)
    const taskDescription = screen.getByText(mockTask.description)

    expect(taskTitle).toBeInTheDocument()
    expect(taskDescription).toBeInTheDocument()
  })

  test('вызывает функцию onToggleTask при клике на кнопку "выполнения"', () => {
    render(
      <TaskItem task={mockTask} onDeleteTask={mockOnDeleteTask} onUpdateTask={mockOnUpdateTask} onToggleTask={mockOnToggleTask} />
    )

    // Находим кнопку завершения (выполнена, не выполнена) по aria-label
    const completeButton = screen.getByLabelText('complete-toggle-button')
    fireEvent.click(completeButton) // Кликаем на кнопку завершения

    expect(mockOnToggleTask).toHaveBeenCalledWith(mockTask.id) // Ожидаем, что функция onToggleTask будет вызвана с id задачи
  })

  test('вызывает функцию onDeleteTask при клике на кнопку удаления', () => {
    render(
      <TaskItem task={mockTask} onDeleteTask={mockOnDeleteTask} onToggleTask={mockOnToggleTask} onUpdateTask={mockOnUpdateTask} />
    )

    const deleteButton = screen.getByLabelText('delete') // Ожидаем, что кнопка удаления задачи присутствует
    fireEvent.click(deleteButton) // Кликаем на кнопку удаления задачи

    expect(mockOnDeleteTask).toHaveBeenCalledWith(mockTask.id) // Ожидаем, что функция onDeleteTask была вызвана с id задачи
  })

  test('открывает редактирование задачи по клику на кнопку редактирования', () => {
    render(
      <TaskItem task={mockTask} onDeleteTask={mockOnDeleteTask} onUpdateTask={mockOnUpdateTask} onToggleTask={mockOnToggleTask} />
    )

    const editButton = screen.getByLabelText('edit') // Находим кнопку редактирования задачи по aria-label
    fireEvent.click(editButton) // Кликаем на кнопку редактирования задачи

    const editForm = screen.getByTestId('task-edit-form') // Ожидаем, что форма редактирования отображается

    expect(editForm).toBeInTheDocument() // Ожидаем, что форма редактирования содержит информацию о задаче
    expect(screen.getByLabelText('Название задачи')).toHaveValue(mockTask.title)
    expect(screen.getByLabelText('Описание задачи')).toHaveValue(mockTask.description)
  })
})
