import React from 'react'
import { Card, CardHeader, CardPreview, Title1, Title2, Body1 } from '@fluentui/react-components'

interface WelcomeCardProps {
    style?: React.CSSProperties
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ style }) => {
    return (
        <Card style={{ width: '400px', maxWidth: '90%', ...style }}>
            <CardPreview>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    justifyContent: 'center',
                    padding: '24px'
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
        </Card>
    )
}

export default WelcomeCard
