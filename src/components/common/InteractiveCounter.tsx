import React from 'react'
import { Card, CardHeader, Title2, Body1, Button, Text } from '@fluentui/react-components'

interface InteractiveCounterProps {
    count: number
    setCount: (count: number | ((prev: number) => number)) => void
    style?: React.CSSProperties
}

const InteractiveCounter: React.FC<InteractiveCounterProps> = ({ count, setCount, style }) => {
    return (
        <Card style={{ width: '400px', maxWidth: '90%', ...style }}>
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
    )
}

export default InteractiveCounter
