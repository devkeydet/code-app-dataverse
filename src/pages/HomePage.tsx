import React from 'react'
import { Title1, makeStyles } from '@fluentui/react-components'
import { BasePage, ErrorAlert, InteractiveCounter } from '../components'

const useStyles = makeStyles({
    centeredContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%'
    }
})

interface HomePageProps {
    title: string
    error?: string | null
    count: number
    setCount: (count: number | ((prev: number) => number)) => void
}

const HomePage: React.FC<HomePageProps> = ({ title, error, count, setCount }) => {
    const styles = useStyles()
    const header = <Title1>{title}</Title1>;

    return (
        <BasePage header={header}>
            <div className={styles.centeredContainer}>
                {error && <ErrorAlert error={error} />}
                <InteractiveCounter count={count} setCount={setCount} />
            </div>
        </BasePage>
    )
}

export default HomePage
