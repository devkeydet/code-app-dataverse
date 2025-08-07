import { Text } from '@fluentui/react-components'
import BasePage from '../../pages/BasePage'

interface PlaceholderPageProps {
    title: string
    message: string
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, message }) => {
    return (
        <BasePage title={title}>
            <Text size={400}>
                {message}
            </Text>
        </BasePage>
    )
}

export default PlaceholderPage
