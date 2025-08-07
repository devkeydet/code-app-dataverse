import { PlaceholderPage } from '../components'

interface AppsPageProps {
    title: string
}

const AppsPage: React.FC<AppsPageProps> = ({ title }) => {
    return (
        <PlaceholderPage
            title={title}
            message="Power Platform applications will be displayed here..."
            alignment="left"
        />
    )
}

export default AppsPage
