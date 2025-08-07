import React from 'react'
import {
    Card,
    CardHeader,
    CardPreview,
    Text,
    Title1,
    Title2,
    Body1,
    Button
} from '@fluentui/react-components'
import BasePage from './BasePage'

interface ActivityPageProps {
    title: string
    error?: string | null
    count: number
    setCount: (count: number | ((prev: number) => number)) => void
}

const ActivityPage: React.FC<ActivityPageProps> = ({ title, error, count, setCount }) => {
    return (
        <BasePage title={title}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px'
            }}>
                {error && (
                    <div style={{
                        padding: '16px',
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        width: '100%',
                        maxWidth: '400px'
                    }}>
                        <Text weight="semibold">Error loading user profile</Text>
                        <br />
                        <Text size={200}>{error}</Text>
                    </div>
                )}

                <Card style={{ width: '400px', maxWidth: '90%' }}>
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

                <Card style={{ width: '400px', maxWidth: '90%' }}>
                    <CardHeader
                        header={<Title2>Interactive Counter</Title2>}
                        description={
                            <Body1>
                                Test the reactivity with this simple counter example.
                            </Body1>
                        }
                    />
                    <div style={{ padding: '16px', textAlign: 'center' }}>
                        <Button
                            appearance="primary"
                            size="large"
                            onClick={() => setCount((count) => count + 1)}
                            style={{ marginBottom: '16px' }}
                        >
                            Count is {count}
                        </Button>
                        <br />
                        <Text size={200}>
                            Edit <code>src/App.tsx</code> and save to test HMR
                        </Text>
                    </div>
                </Card>

                <Text size={200} style={{ opacity: 0.7, textAlign: 'center', maxWidth: '600px' }}>
                    Click on the Vite and React logos to learn more about the technologies powering this app.
                    The sidebar navigation follows Microsoft Teams design patterns for familiarity.
                </Text>
            </div>
        </BasePage>
    )
}

export default ActivityPage
