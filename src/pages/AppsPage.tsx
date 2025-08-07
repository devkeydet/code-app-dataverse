import { PlaceholderPage } from '../components'
import type { PageAlignment } from './BasePage'

interface AppsPageProps {
    title: string
    alignment?: PageAlignment
}

const AppsPage: React.FC<AppsPageProps> = ({ title, alignment = 'center' }) => {
    return (
        <PlaceholderPage
            title={title}
            message="Power Platform applications will be displayed here..."
            alignment={alignment}
        />
    )
}

export default AppsPage
