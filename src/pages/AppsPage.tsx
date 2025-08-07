import React from 'react'
import { Text } from '@fluentui/react-components'
import BasePage from './BasePage'

const AppsPage: React.FC = () => {
  return (
    <BasePage title="Apps">
      <Text size={400}>
        Power Platform applications will be displayed here...
      </Text>
    </BasePage>
  )
}

export default AppsPage
