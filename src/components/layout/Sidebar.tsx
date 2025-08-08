import React from 'react'
import NavigationButton from '../common/NavigationButton'
import {
    Home24Regular,
    ContactCard24Regular,
    Chat24Regular,
    People24Regular,
    Apps24Regular,
    Settings24Regular,
    Bug24Regular
} from '@fluentui/react-icons'

interface SidebarProps {
    currentPage: string
    onPageChange: (page: string) => void
    className?: string
    buttonClassName?: string
}

const mainNavigationItems = [
    { key: 'Home', icon: <Home24Regular />, label: 'Home' },
    { key: 'Contacts', icon: <ContactCard24Regular />, label: 'Contacts' },
    { key: 'Chat', icon: <Chat24Regular />, label: 'Chat' },
    { key: 'Teams', icon: <People24Regular />, label: 'Teams' },
    { key: 'Apps', icon: <Apps24Regular />, label: 'Apps' }
]

const bottomNavigationItems = [
    { key: 'Debug', icon: <Bug24Regular />, label: 'Debug' },
    { key: 'Settings', icon: <Settings24Regular />, label: 'Settings' }
]

const Sidebar: React.FC<SidebarProps> = ({
    currentPage,
    onPageChange,
    className,
    buttonClassName
}) => {
    return (
        <div className={className} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Main navigation items */}
            <div>
                {mainNavigationItems.map((item) => (
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

            {/* Spacer to push bottom items down */}
            <div style={{ flex: 1 }}></div>

            {/* Bottom navigation items (Settings) */}
            <div style={{ paddingBottom: '16px', paddingTop: '12px' }}>
                {bottomNavigationItems.map((item) => (
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
        </div>
    )
}

export default Sidebar
