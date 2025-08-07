import { Text } from '@fluentui/react-components'
import BasePage from '../../pages/BasePage'
import type { PageAlignment } from '../../pages/BasePage'

interface PlaceholderPageProps {
    title: string
    message: string
    alignment?: PageAlignment
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, message, alignment = 'center' }) => {
    return (
        <BasePage title={title} alignment={alignment}>
            <Text size={400}>
                {message}
            </Text>
        </BasePage>
    )
}

export default PlaceholderPage
