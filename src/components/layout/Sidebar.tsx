import React from 'react'
import NavigationButton from '../common/NavigationButton'
import {
    Home24Regular,
    Chat24Regular,
    People24Regular,
    Apps24Regular,
    Settings24Regular
} from '@fluentui/react-icons'

interface SidebarProps {
    currentPage: string
    onPageChange: (page: string) => void
    className?: string
    buttonClassName?: string
}

const navigationItems = [
    { key: 'Home', icon: <Home24Regular />, label: 'Home' },
    { key: 'Chat', icon: <Chat24Regular />, label: 'Chat' },
    { key: 'Teams', icon: <People24Regular />, label: 'Teams' },
    { key: 'Apps', icon: <Apps24Regular />, label: 'Apps' },
    { key: 'Settings', icon: <Settings24Regular />, label: 'Settings' }
]

const Sidebar: React.FC<SidebarProps> = ({
    currentPage,
    onPageChange,
    className,
    buttonClassName
}) => {
    return (
        <div className={className}>
            {navigationItems.map((item) => (
                <NavigationButton
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => onPageChange(item.key)}
                    className={buttonClassName}
                    isActive={currentPage === item.key}
                />
            ))}
        </div>
    )
}

export default Sidebar
