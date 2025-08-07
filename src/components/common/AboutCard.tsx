import { CardHeader, CardPreview, Title1, Title2, Body1 } from '@fluentui/react-components'
import CommonCard from './CommonCard'
import { STYLE_CONSTANTS } from '../../constants/styles'

interface AboutCardProps {
    style?: React.CSSProperties
}

const AboutCard: React.FC<AboutCardProps> = ({ style }) => {
    // Create wide card style - double the width of standard cards
    const wideCardStyle: React.CSSProperties = {
        width: '800px', // Double the standard 400px
        maxWidth: '90%',
        ...style
    }

    return (
        <CommonCard style={wideCardStyle}>
            <CardPreview>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: STYLE_CONSTANTS.SPACING.MD,
                    justifyContent: 'center',
                    padding: STYLE_CONSTANTS.SPACING.LG
                }}>
                    <img src="/vite.svg" style={{ height: '6em' }} alt="Vite logo" />
                    <Title1>+</Title1>
                    <img src="/src/assets/react.svg" style={{ height: '6em' }} alt="React logo" />
                </div>
            </CardPreview>
            <CardHeader
                header={<Title2>About this Power Platform Code App</Title2>}
                description={
                    <Body1>
                        This application is built with React + TypeScript + Vite and integrated with Microsoft's Fluent UI design system.
                        It connects to Dataverse and Office 365 services, providing a modern Teams-inspired interface for Power Platform development.
                    </Body1>
                }
            />
        </CommonCard>
    )
}

export default AboutCard
