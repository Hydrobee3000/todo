import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  test('отображает правильный заголовок', () => {
    render(<Header />)

    const headerTitle = screen.getByText('Список дел')
    expect(headerTitle).toBeInTheDocument() // Проверяем, что компонент содержит правильный заголовок
  })
})
