import React from 'react'
import { Text } from '@fluentui/react-components'
import BasePage from './BasePage'
import { ErrorAlert, WelcomeCard, InteractiveCounter, CenteredContent } from '../components'

interface HomePageProps {
    title: string
    error?: string | null
    count: number
    setCount: (count: number | ((prev: number) => number)) => void
}

const HomePage: React.FC<HomePageProps> = ({ title, error, count, setCount }) => {
    return (
        <BasePage title={title}>
            <CenteredContent>
                {error && <ErrorAlert error={error} />}

                <WelcomeCard />

                <InteractiveCounter count={count} setCount={setCount} />

                <Text size={200} style={{ opacity: 0.7, textAlign: 'center', maxWidth: '600px' }}>
                    Click on the Vite and React logos to learn more about the technologies powering this app.
                    The sidebar navigation follows Microsoft Teams design patterns for familiarity.
                </Text>
            </CenteredContent>
        </BasePage>
    )
}

export default HomePage
