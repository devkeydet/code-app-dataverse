import { PlaceholderPage } from '../components'
import type { PageAlignment } from './BasePage'

interface TeamsPageProps {
    title: string
    alignment?: PageAlignment
}

const TeamsPage: React.FC<TeamsPageProps> = ({ title, alignment = 'center' }) => {
    return (
        <PlaceholderPage
            title={title}
            message="Teams collaboration features coming soon..."
            alignment={alignment}
        />
    )
}

export default TeamsPage
