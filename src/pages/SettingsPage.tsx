import { PlaceholderPage } from '../components'

interface SettingsPageProps {
    title: string
}

const SettingsPage: React.FC<SettingsPageProps> = ({ title }) => {
    return (
        <PlaceholderPage
            title={title}
            message="Application settings and configurations will be displayed here..."
        />
    )
}

export default SettingsPage
