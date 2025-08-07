import { Title2 } from '@fluentui/react-components'
import { STYLE_CONSTANTS, COMMON_STYLES } from '../../constants/styles'

export type PageAlignment = 'center' | 'left'

interface BasePageProps {
    title: string
    children: React.ReactNode
    alignment?: PageAlignment
}

const BasePage: React.FC<BasePageProps> = ({
    title,
    children,
    alignment = 'center'
}) => {
    const contentStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignment === 'center' ? 'center' : 'flex-start',
        justifyContent: 'flex-start', // Always top-aligned, never vertically centered
        width: '100%',
        gap: '24px', // Add spacing between content items
        padding: STYLE_CONSTANTS.LAYOUT.PAGE_PADDING,
        paddingTop: '0', // Remove top padding since title has its own padding
        overflowY: 'auto', // Allow vertical content to scroll
        overflowX: 'hidden', // Prevent horizontal scroll
        flex: '1 1 auto', // Allow growth and shrinking but maintain auto basis
        minHeight: 'min-content' // Ensure minimum height based on content
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Fill the available height
            minHeight: '100%',
            width: '100%', // Ensure full width
            maxWidth: '100%', // Prevent exceeding viewport
            overflowX: 'hidden' // Prevent horizontal scroll at page level
        }}>
            {/* Sticky Title Area */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backgroundColor: 'var(--colorNeutralBackground1)', // Use Fluent theme background
                padding: STYLE_CONSTANTS.LAYOUT.PAGE_PADDING,
                paddingBottom: '12px'
            }}>
                <Title2 style={{ ...COMMON_STYLES.pageTitle, textAlign: 'left', marginBottom: 0 }}>
                    {title}
                </Title2>
            </div>

            {/* Scrollable Content Area */}
            <div style={contentStyle}>
                {children}
            </div>
        </div>
    )
}

export default BasePage
