import React from 'react'
import { Title2 } from '@fluentui/react-components'

interface BasePageProps {
  title: string
  children: React.ReactNode
}

const BasePage: React.FC<BasePageProps> = ({ title, children }) => {
  return (
    <div style={{ 
      padding: '24px 24px 20px 24px', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Title2 style={{ marginBottom: '16px', marginTop: '0' }}>
        {title}
      </Title2>
      {children}
    </div>
  )
}

export default BasePage
