import React from 'react'
import { Text } from '@fluentui/react-components'
import BasePage from './BasePage'
import type { PageAlignment } from './BasePage'
import { ErrorAlert, WelcomeCard, InteractiveCounter } from '../components'
import { COMMON_STYLES } from '../constants/styles'

interface HomePageProps {
    title: string
    error?: string | null
    count: number
    setCount: (count: number | ((prev: number) => number)) => void
    alignment?: PageAlignment
}

const HomePage: React.FC<HomePageProps> = ({ title, error, count, setCount, alignment = 'center' }) => {
    return (
        <BasePage title={title} alignment={alignment}>
            {error && <ErrorAlert error={error} />}
            <WelcomeCard />
            <InteractiveCounter count={count} setCount={setCount} />
            <Text size={200} style={{
                ...COMMON_STYLES.secondaryText,
                textAlign: alignment === 'center' ? 'center' : 'left',
                maxWidth: '600px'
            }}>
                Click on the Vite and React logos to learn more about the technologies powering this app.
                The sidebar navigation follows Microsoft Teams design patterns for familiarity.
            </Text>
        </BasePage>
    )
}

export default HomePage
