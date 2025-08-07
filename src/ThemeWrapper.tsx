import { FluentProvider } from '@fluentui/react-components'
import { useTheme } from './hooks/useTheme'
import type { ReactNode } from 'react'

interface ThemeWrapperProps {
    children: ReactNode
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
    const { theme } = useTheme()

    return (
        <FluentProvider theme={theme}>
            {children}
        </FluentProvider>
    )
}
