import React from 'react'
import { Text } from '@fluentui/react-components'
import BasePage from './BasePage'

const SettingsPage: React.FC = () => {
  return (
    <BasePage title="Settings">
      <Text size={400}>
        Application settings and configuration options...
      </Text>
    </BasePage>
  )
}

export default SettingsPage
