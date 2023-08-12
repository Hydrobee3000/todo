import { render, screen } from '@testing-library/react'
import TaskActions from './TaskActions'

describe('TaskActions', () => {
  const mockSetIsCreatingTask = jest.fn() // Мок для функции установки состояния создания задачи
  const mockSetShowTasks = jest.fn() // Мок для функции установки фильтрации задач

  test('отображает компонент TaskCreateButton', () => {
    render(
      <TaskActions
        isCreatingTask={false}
        setIsCreatingTask={mockSetIsCreatingTask}
        showTasks='all'
        setShowTasks={mockSetShowTasks}
      />
    )

    const taskCreateButton = screen.getByTestId('task-create-button') // Находим компонент TaskCreateButton

    expect(taskCreateButton).toBeInTheDocument() // Проверяем, что компонент присутствует на странице
  })

  test('отображает компонент TaskFilters', () => {
    render(
      <TaskActions
        isCreatingTask={false}
        setIsCreatingTask={mockSetIsCreatingTask}
        showTasks='all'
        setShowTasks={mockSetShowTasks}
      />
    )

    const taskFilters = screen.getByTestId('task-filters')

    expect(taskFilters).toBeInTheDocument()
  })
})
