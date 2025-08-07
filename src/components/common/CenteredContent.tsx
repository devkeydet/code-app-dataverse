import React from 'react'

interface CenteredContentProps {
    children: React.ReactNode
    gap?: string
    style?: React.CSSProperties
}

const CenteredContent: React.FC<CenteredContentProps> = ({
    children,
    gap = '24px',
    style
}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap,
            ...style
        }}>
            {children}
        </div>
    )
}

export default CenteredContent
