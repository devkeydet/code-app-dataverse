import { BasePage } from '../components'
import { Text } from '@fluentui/react-components'

interface ChatPageProps {
    title: string
}

const ChatPage: React.FC<ChatPageProps> = ({ title }) => {
    return (
        <BasePage
            title={title}
            alignment="center"
        >
            <Text size={400}>
                Chat functionality coming soon...
            </Text>
        </BasePage>
    )
}

export default ChatPage
