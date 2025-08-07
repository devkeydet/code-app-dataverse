import { BasePage } from '../components'
import { Text } from '@fluentui/react-components'

interface AppsPageProps {
    title: string
}

const AppsPage: React.FC<AppsPageProps> = ({ title }) => {
    return (
        <BasePage
            title={title}
            alignment="left"
        >
            <Text size={400}>
                Power Platform applications will be displayed here...
            </Text>
        </BasePage>
    )
}

export default AppsPage
