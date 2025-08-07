import React from 'react'
import { BasePage, ErrorAlert, InteractiveCounter } from '../components'

interface HomePageProps {
    title: string
    error?: string | null
    count: number
    setCount: (count: number | ((prev: number) => number)) => void
}

const HomePage: React.FC<HomePageProps> = ({ title, error, count, setCount }) => {
    return (
        <BasePage title={title} alignment="center">
            {error && <ErrorAlert error={error} />}
            <InteractiveCounter count={count} setCount={setCount} />
        </BasePage>
    )
}

export default HomePage
