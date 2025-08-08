import { BasePage } from '../components'
import { Text, Title1 } from '@fluentui/react-components'

interface AppsPageProps {
    title: string
}

const AppsPage: React.FC<AppsPageProps> = ({ title }) => {
    const header = <Title1>{title}</Title1>;

    return (
        <BasePage header={header}>
            <Text size={400}>
                Power Platform applications will be displayed here...
            </Text>
        </BasePage>
    )
}

export default AppsPage
