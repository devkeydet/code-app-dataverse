import { BasePage } from '../components'
import { Text } from '@fluentui/react-components'

interface TeamsPageProps {
    title: string
}

const TeamsPage: React.FC<TeamsPageProps> = ({ title }) => {
    return (
        <BasePage
            title={title}
            alignment="left"
        >
            <Text size={400}>
                Teams collaboration features coming soon...
            </Text>
        </BasePage>
    )
}

export default TeamsPage
