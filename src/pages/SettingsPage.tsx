import { BasePage } from '../components'
import { Text } from '@fluentui/react-components'

interface SettingsPageProps {
    title: string
}

const SettingsPage: React.FC<SettingsPageProps> = ({ title }) => {
    return (
        <BasePage
            title={title}
            alignment="center"
        >
            <Text size={400}>
                Application settings and configurations will be displayed here...
            </Text>
        </BasePage>
    )
}

export default SettingsPage
