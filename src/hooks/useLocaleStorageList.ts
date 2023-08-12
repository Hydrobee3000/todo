import { useEffect, useState } from 'react'

interface LocalStorageListResult<T> {
  state: T
  setState: React.Dispatch<React.SetStateAction<T>>
}

// Кастомный хук для работы с localStorage
function useLocalStorageList<T>(key: string, defaultValue: T): LocalStorageListResult<T> {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key) // Получение значения из localStorage, если оно есть
    return storedValue ? JSON.parse(storedValue) : defaultValue
  })

  // Сохранение значения в localStorage при изменении состояния
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  return { state, setState }
}

export default useLocalStorageList
