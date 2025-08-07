import React from 'react'
import { Button, Text } from '@fluentui/react-components'
import { WeatherSunny24Regular, WeatherMoon24Regular } from '@fluentui/react-icons'

interface TitleBarProps {
    isDarkTheme: boolean
    onThemeToggle: () => void
    userProfileComponent: React.ReactNode
    className?: string
}

const TitleBar: React.FC<TitleBarProps> = ({
    isDarkTheme,
    onThemeToggle,
    userProfileComponent,
    className
}) => {
    return (
        <div className={className}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 1,
                minWidth: 0
            }}>
                <img
                    src="/src/assets/react.svg"
                    style={{ height: '24px', width: '24px', marginLeft: '0px' }}
                    alt="React logo"
                />
                <Text
                    size={500}
                    weight="semibold"
                    style={{ marginLeft: '24px' }}
                >
                    Power Platform Code App using Dataverse (Fluent UI React v9 & Teams inspired)
                </Text>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexShrink: 0,
                marginRight: '0'
            }}>
                <Button
                    appearance="subtle"
                    icon={isDarkTheme ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
                    onClick={onThemeToggle}
                    title={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
                />
                {userProfileComponent}
            </div>
        </div>
    )
}

export default TitleBar
