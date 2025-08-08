import { BasePage } from '../components'
import { Text, Title1 } from '@fluentui/react-components'

interface TeamsPageProps {
    title: string
}

const TeamsPage: React.FC<TeamsPageProps> = ({ title }) => {
    const header = <Title1>{title}</Title1>;

    return (
        <BasePage header={header}>
            <Text size={400}>
                Teams collaboration features coming soon...
            </Text>
        </BasePage>
    )
}

export default TeamsPage
