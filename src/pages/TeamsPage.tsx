import React from 'react'
import { Text } from '@fluentui/react-components'
import BasePage from './BasePage'

interface TeamsPageProps {
    title: string
}

const TeamsPage: React.FC<TeamsPageProps> = ({ title }) => {
    return (
        <BasePage title={title}>
            <Text size={400}>
                Teams collaboration features coming soon...
            </Text>
        </BasePage>
    )
}

export default TeamsPage
