import React from 'react'
import { Text } from '@fluentui/react-components'
import { BasePage, AboutCard, ThemeToggleCard } from '../components'
import { COMMON_STYLES } from '../constants/styles'

interface SettingsPageProps {
    title: string
    isDarkTheme: boolean
    onThemeToggle: () => void
}

const SettingsPage: React.FC<SettingsPageProps> = ({ title, isDarkTheme, onThemeToggle }) => {
    return (
        <BasePage
            title={title}
            alignment="center"
        >
            <AboutCard />
            <ThemeToggleCard
                isDarkTheme={isDarkTheme}
                onThemeToggle={onThemeToggle}
            />
            <Text size={200} style={{
                ...COMMON_STYLES.secondaryText,
                textAlign: 'center',
                maxWidth: '800px'
            }}>
                Click on the Vite and React logos to learn more about the technologies powering this app.
                The sidebar navigation follows Microsoft Teams design patterns for familiarity.
            </Text>
        </BasePage>
    )
}

export default SettingsPage
