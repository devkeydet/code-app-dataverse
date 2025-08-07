import { PlaceholderPage } from '../components'

interface TeamsPageProps {
    title: string
}

const TeamsPage: React.FC<TeamsPageProps> = ({ title }) => {
    return (
        <PlaceholderPage
            title={title}
            message="Teams collaboration features coming soon..."
        />
    )
}

export default TeamsPage
