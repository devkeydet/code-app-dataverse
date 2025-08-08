import { BasePage } from '../components'
import { Text, Title1 } from '@fluentui/react-components'

interface ChatPageProps {
    title: string
}

const ChatPage: React.FC<ChatPageProps> = ({ title }) => {
    const header = <Title1>{title}</Title1>;

    return (
        <BasePage header={header}>
            <Text size={400}>
                Chat functionality coming soon...
            </Text>
        </BasePage>
    )
}

export default ChatPage
