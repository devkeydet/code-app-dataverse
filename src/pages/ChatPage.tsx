import { PlaceholderPage } from '../components'
import type { PageAlignment } from './BasePage'

interface ChatPageProps {
    title: string
    alignment?: PageAlignment
}

const ChatPage: React.FC<ChatPageProps> = ({ title, alignment = 'center' }) => {
    return (
        <PlaceholderPage
            title={title}
            message="Chat functionality coming soon..."
            alignment={alignment}
        />
    )
}

export default ChatPage
