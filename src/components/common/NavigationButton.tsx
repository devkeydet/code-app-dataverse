import React from 'react'
import { Button } from '@fluentui/react-components'

interface NavigationButtonProps {
    icon: React.ReactElement
    label: string
    onClick: () => void
    className?: string
    isActive?: boolean
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
    icon,
    label,
    onClick,
    className,
    isActive = false
}) => {
    return (
        <Button
            appearance={isActive ? "primary" : "subtle"}
            className={className}
            title={label}
            onClick={onClick}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px'
            }}>
                {icon}
                <span style={{ fontSize: '10px' }}>{label}</span>
            </div>
        </Button>
    )
}

export default NavigationButton
