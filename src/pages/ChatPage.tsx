import React from 'react'
import { Text } from '@fluentui/react-components'
import BasePage from './BasePage'

interface ChatPageProps {
    title: string
}

const ChatPage: React.FC<ChatPageProps> = ({ title }) => {
    return (
        <BasePage title={title}>
            <Text size={400}>
                Chat functionality coming soon...
            </Text>
        </BasePage>
    )
}

export default ChatPage
