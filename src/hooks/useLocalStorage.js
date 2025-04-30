
import { useState, useEffect } from "react"

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      console.log(`Leyendo ${key} del localStorage:`, item) // Debug
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error leyendo ${key} del localStorage:`, error) // Debug
      return initialValue
    }
  })

  useEffect(() => {
    try {
      console.log(`Guardando ${key} en localStorage:`, storedValue) // Debug
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error guardando ${key} en localStorage:`, error) // Debug
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
