import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import TaskCreateButton from './TaskCreateButton'

describe('TaskCreateButton', () => {
  const mockSetIsCreatingTask = jest.fn()

  test('отображает кнопку добавления задачи', () => {
    render(<TaskCreateButton isCreatingTask={false} setIsCreatingTask={mockSetIsCreatingTask} />)

    const addTaskButton = screen.getByLabelText('add') // Находим кнопку добавления задачи

    expect(addTaskButton).toBeInTheDocument() // Проверяем, что кнопка присутствует

    fireEvent.click(addTaskButton) // Эмулируем клик на кнопку

    expect(mockSetIsCreatingTask).toHaveBeenCalled() // Проверяем, что функция была вызвана
  })

  test('displays the cancel task creation button', () => {
    render(<TaskCreateButton isCreatingTask={true} setIsCreatingTask={mockSetIsCreatingTask} />)

    const cancelTaskButton = screen.getByLabelText('cancel')

    expect(cancelTaskButton).toBeInTheDocument()

    fireEvent.click(cancelTaskButton)

    expect(mockSetIsCreatingTask).toHaveBeenCalled()
  })
})
