import { Title2 } from '@fluentui/react-components'
import { STYLE_CONSTANTS, COMMON_STYLES } from '../constants/styles'

interface BasePageProps {
    title: string
    children: React.ReactNode
}

const BasePage: React.FC<BasePageProps> = ({ title, children }) => {
    return (
        <div style={{
            padding: STYLE_CONSTANTS.LAYOUT.PAGE_PADDING,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Title2 style={COMMON_STYLES.pageTitle}>
                {title}
            </Title2>
            {children}
        </div>
    )
}

export default BasePage
