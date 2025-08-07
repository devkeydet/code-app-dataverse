import { CardHeader, CardPreview, Title1, Title2, Body1 } from '@fluentui/react-components'
import CommonCard from './CommonCard'
import { STYLE_CONSTANTS } from '../../constants/styles'

interface WelcomeCardProps {
    style?: React.CSSProperties
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ style }) => {
    return (
        <CommonCard style={style}>
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
                header={<Title2>Welcome to your Power Platform Code App</Title2>}
                description={
                    <Body1>
                        This app is built with React + TypeScript + Vite and integrated with Microsoft's Fluent UI design system.
                        It connects to Dataverse and Office 365 services.
                    </Body1>
                }
            />
        </CommonCard>
    )
}

export default WelcomeCard
