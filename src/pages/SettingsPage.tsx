import React from 'react'
import { Text } from '@fluentui/react-components'
import BasePage from './BasePage'

interface SettingsPageProps {
    title: string
}

const SettingsPage: React.FC<SettingsPageProps> = ({ title }) => {
    return (
        <BasePage title={title}>
            <Text size={400}>
                Application settings and configuration options...
            </Text>
        </BasePage>
    )
}

export default SettingsPage
