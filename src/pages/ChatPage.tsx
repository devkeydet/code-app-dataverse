import { PlaceholderPage } from '../components'

interface ChatPageProps {
    title: string
}

const ChatPage: React.FC<ChatPageProps> = ({ title }) => {
    return (
        <PlaceholderPage
            title={title}
            message="Chat functionality coming soon..."
        />
    )
}

export default ChatPage
