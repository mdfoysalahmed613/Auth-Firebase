import React, { useContext } from 'react'
import ThemeContext from './ThemeContext'

export default function useTheme() {
  const context = useContext(ThemeContext)
  return context;
}
