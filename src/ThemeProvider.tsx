import React, { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import { webLightTheme, webDarkTheme } from '@fluentui/react-components'
import type { Theme } from '@fluentui/react-components'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    themeMode: ThemeMode
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')

    const theme = themeMode === 'dark' ? webDarkTheme : webLightTheme

    const toggleTheme = () => {
        setThemeMode(prev => prev === 'dark' ? 'light' : 'dark')
    }

    return (
        <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
