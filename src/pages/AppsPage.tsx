import React from 'react'
import { Text } from '@fluentui/react-components'
import BasePage from './BasePage'

interface AppsPageProps {
    title: string
}

const AppsPage: React.FC<AppsPageProps> = ({ title }) => {
    return (
        <BasePage title={title}>
            <Text size={400}>
                Power Platform applications will be displayed here...
            </Text>
        </BasePage>
    )
}

export default AppsPage
