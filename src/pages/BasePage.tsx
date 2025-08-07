import { Title2 } from '@fluentui/react-components'
import { STYLE_CONSTANTS, COMMON_STYLES } from '../constants/styles'
import { AlignmentToggle } from '../components'

export type PageAlignment = 'center' | 'left'

interface BasePageProps {
    title: string
    children: React.ReactNode
    alignment?: PageAlignment
    showAlignmentToggle?: boolean
}

const BasePage: React.FC<BasePageProps> = ({
    title,
    children,
    alignment = 'center',
    showAlignmentToggle = true
}) => {
    const contentStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignment === 'center' ? 'center' : 'flex-start',
        justifyContent: 'flex-start', // Always top-aligned, never vertically centered
        width: '100%',
        flex: 1, // Take up remaining space after title
        minHeight: 0, // Allow flex shrinking
        gap: '24px' // Add spacing between content items
    }

    return (
        <div style={{
            padding: STYLE_CONSTANTS.LAYOUT.PAGE_PADDING,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: '100%', // Fill the available height
            minHeight: '100%'
        }}>
            <Title2 style={{ ...COMMON_STYLES.pageTitle, textAlign: 'left' }}>
                {title}
            </Title2>

            {showAlignmentToggle && (
                <AlignmentToggle pageKey={title} />
            )}

            <div style={contentStyle}>
                {children}
            </div>
        </div>
    )
}

export default BasePage
