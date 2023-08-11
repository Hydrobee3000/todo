import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import TaskFilters from './TaskFilters'

// Тесттирование кнопок фильтрации

describe('TaskFilters', () => {
  const mockSetShowTasks = jest.fn()

  // Тесттирование кнопки "Все задачи"

  test('отображает кнопку для всех задач', () => {
    render(<TaskFilters showTasks='all' setShowTasks={mockSetShowTasks} />)

    const allTasksButton = screen.getByText('Все задачи') // Находим кнопку для всех задач
    fireEvent.click(allTasksButton) // Эмулируем клик на кнопку

    expect(mockSetShowTasks).toHaveBeenCalledWith('all') // Проверяем, что функция была вызвана с нужным аргументом
  })

  // Тесттирование кнопки "Выполненные"

  test('отображает кнопку для выполненных задач', () => {
    render(<TaskFilters showTasks='all' setShowTasks={mockSetShowTasks} />)

    const completedTasksButton = screen.getByText('Выполненные задачи')
    fireEvent.click(completedTasksButton)

    expect(mockSetShowTasks).toHaveBeenCalledWith('completed')
  })

  // Тесттирование кнопки "Невыполненные"

  test('отображает кнопку для невыполненных задач', () => {
    render(<TaskFilters showTasks='all' setShowTasks={mockSetShowTasks} />)

    const incompleteTasksButton = screen.getByText('Невыполненные задачи')
    fireEvent.click(incompleteTasksButton)

    expect(mockSetShowTasks).toHaveBeenCalledWith('incomplete')
  })
})
