import { PlaceholderPage } from '../components'
import type { PageAlignment } from './BasePage'

interface SettingsPageProps {
    title: string
    alignment?: PageAlignment
}

const SettingsPage: React.FC<SettingsPageProps> = ({ title, alignment = 'center' }) => {
    return (
        <PlaceholderPage
            title={title}
            message="Application settings and configurations will be displayed here..."
            alignment={alignment}
        />
    )
}

export default SettingsPage
