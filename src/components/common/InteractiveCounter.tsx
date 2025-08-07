import { CardHeader, Title2, Body1, Button, Text } from '@fluentui/react-components'
import CommonCard from './CommonCard'
import { STYLE_CONSTANTS } from '../../constants/styles'

interface InteractiveCounterProps {
    count: number
    setCount: (count: number | ((prev: number) => number)) => void
    style?: React.CSSProperties
}

const InteractiveCounter: React.FC<InteractiveCounterProps> = ({ count, setCount, style }) => {
    return (
        <CommonCard style={style}>
            <CardHeader
                header={<Title2>Interactive Counter</Title2>}
                description={
                    <Body1>
                        Test the reactivity with this simple counter example.
                    </Body1>
                }
            />
            <div style={{ padding: STYLE_CONSTANTS.SPACING.MD, textAlign: 'center' }}>
                <Button
                    appearance="primary"
                    size="large"
                    onClick={() => setCount((count) => count + 1)}
                    style={{ marginBottom: STYLE_CONSTANTS.SPACING.MD }}
                >
                    Count is {count}
                </Button>
                <br />
                <Text size={200}>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </Text>
            </div>
        </CommonCard>
    )
}

export default InteractiveCounter
