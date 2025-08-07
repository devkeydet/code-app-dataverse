import React from 'react'
import { Button, tokens } from '@fluentui/react-components'
import { AlignLeftRegular, AlignCenterHorizontalRegular } from '@fluentui/react-icons'
import { usePageAlignment } from '../../hooks'

interface AlignmentToggleProps {
    pageKey: string
    style?: React.CSSProperties
}

const AlignmentToggle: React.FC<AlignmentToggleProps> = ({ pageKey, style }) => {
    const { getAlignment, toggleAlignment } = usePageAlignment()
    const currentAlignment = getAlignment(pageKey)

    const isCenter = currentAlignment === 'center'
    const icon = isCenter ? <AlignCenterHorizontalRegular /> : <AlignLeftRegular />
    const tooltipText = isCenter ? 'Switch to left alignment' : 'Switch to center alignment'

    return (
        <Button
            appearance="subtle"
            icon={icon}
            title={tooltipText}
            onClick={() => toggleAlignment(pageKey)}
            style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                color: tokens.colorNeutralForeground1,
                ...style
            }}
        />
    )
}

export default AlignmentToggle
