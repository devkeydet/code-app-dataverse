import { useState, useEffect } from 'react'
import './App.css'
import { Office365UsersService } from './Services/Office365UsersService'
import type { GraphUser_V1 } from './Models/Office365UsersModel'
import { ActivityPage, ChatPage, TeamsPage, AppsPage, SettingsPage } from './pages'
import {
  Avatar,
  Button,
  Text,
  makeStyles,
  shorthands,
  tokens,
  Spinner,
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverSurface
} from '@fluentui/react-components'
import {
  Home24Regular,
  Chat24Regular,
  People24Regular,
  Settings24Regular,
  Apps24Regular,
  WeatherSunny24Regular,
  WeatherMoon24Regular
} from '@fluentui/react-icons'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    overflow: 'hidden',
  },
  titleBar: {
    height: '48px',
    backgroundColor: tokens.colorNeutralBackground2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding('0', '20px'),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'visible',
  },
  mainLayout: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: '56px',
    backgroundColor: tokens.colorNeutralBackground2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.padding('8px', '4px'),
    ...shorthands.gap('4px'),
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  sidebarButton: {
    width: '48px',
    height: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.borderRadius('6px'),
    ...shorthands.padding('6px', '2px'),
    fontSize: '10px',
    fontWeight: '400',
    lineHeight: '12px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  contentArea: {
    flex: 1,
    ...shorthands.padding('0px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    ...shorthands.gap('24px'),
  },
  profilePopover: {
    minWidth: '280px',
    maxWidth: 'min(400px, calc(100vw - 40px))',
    width: 'max-content',
    ...shorthands.padding('16px'),
  },
  profilePopoverHeader: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    ...shorthands.margin('0', '0', '12px', '0'),
  },
  profilePopoverText: {
    whiteSpace: 'nowrap',
  },
  profileAvatar: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  }
})

function App() {
  const styles = useStyles()
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<GraphUser_V1 | null>(null)
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('Activity')

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        console.log('Starting to load user profile...')

        // Get user profile
        const profileResult = await Office365UsersService.MyProfile_V2('displayName,mail,givenName,surname,id')
        console.log('Profile result:', profileResult)

        if (profileResult.success && profileResult.data) {
          console.log('Profile data:', profileResult.data)
          setUser(profileResult.data)

          // Get user photo using the user ID
          if (profileResult.data.id) {
            console.log('Loading photo for user ID:', profileResult.data.id)
            const photoResult = await Office365UsersService.UserPhoto_V2(profileResult.data.id)
            console.log('Photo result:', photoResult)

            if (photoResult.success && photoResult.data) {
              setUserPhoto(photoResult.data)
            } else {
              console.log('Photo failed or no data:', photoResult.error)
            }
          }
        } else {
          console.error('Profile request failed:', profileResult.error)
          setError(profileResult.error || 'Unknown error loading profile')
        }
      } catch (error) {
        console.error('Error loading user profile:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  const renderPageContent = () => {
    switch (currentPage) {
      case 'Activity':
        return <ActivityPage error={error} count={count} setCount={setCount} />
      case 'Chat':
        return <ChatPage />
      case 'Teams':
        return <TeamsPage />
      case 'Apps':
        return <AppsPage />
      case 'Settings':
        return <SettingsPage />
      default:
        return <div>Page not found</div>
    }
  }

  return (
    <FluentProvider
      theme={isDarkTheme ? webDarkTheme : webLightTheme}
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        display: 'block'
      }}
    >
      <div className={styles.root}>
        {/* Teams-style Title Bar */}
        <div className={styles.titleBar}>
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 1, minWidth: 0 }}>
            <img src="/src/assets/react.svg" style={{ height: '24px', width: '24px', marginLeft: '0px' }} alt="React logo" />
            <Text size={500} weight="semibold" style={{ marginLeft: '24px' }}>Power Platform Code App using Dataverse (Fluent UI React v9 & Teams inspired) </Text>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, marginRight: '0' }}>
            {/* Theme Toggle Button */}
            <Button
              appearance="subtle"
              icon={isDarkTheme ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
              onClick={() => setIsDarkTheme(!isDarkTheme)}
              title={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
            />

            {/* User Profile in Title Bar */}
            {loading ? (
              <Spinner size="tiny" />
            ) : user ? (
              <Popover
                open={isProfilePopoverOpen}
                onOpenChange={(_, data) => setIsProfilePopoverOpen(data.open)}
                positioning="below-end"
              >
                <PopoverTrigger disableButtonEnhancement>
                  <Tooltip
                    content={user.displayName || `${user.givenName || ''} ${user.surname || ''}`.trim()}
                    relationship="label"
                  >
                    <Avatar
                      className={styles.profileAvatar}
                      image={userPhoto ? { src: `data:image/jpeg;base64,${userPhoto}` } : undefined}
                      name={user.displayName || `${user.givenName || ''} ${user.surname || ''}`.trim()}
                      size={32}
                    />
                  </Tooltip>
                </PopoverTrigger>
                <PopoverSurface className={styles.profilePopover}>
                  <div className={styles.profilePopoverHeader}>
                    <Avatar
                      image={userPhoto ? { src: `data:image/jpeg;base64,${userPhoto}` } : undefined}
                      name={user.displayName || `${user.givenName || ''} ${user.surname || ''}`.trim()}
                      size={48}
                    />
                    <div className={styles.profilePopoverText}>
                      <Text weight="semibold" size={400}>
                        {user.displayName || `${user.givenName || ''} ${user.surname || ''}`.trim()}
                      </Text>
                      <br />
                      <Text size={300} style={{ opacity: 0.7 }}>
                        {user.mail}
                      </Text>
                    </div>
                  </div>
                  <div style={{ borderTop: `1px solid ${tokens.colorNeutralStroke2}`, paddingTop: '12px' }}>
                    <Text size={200}>
                      Office 365 User Profile
                    </Text>
                    <br />
                    <Text size={200} style={{ opacity: 0.6 }}>
                      Connected via Power Platform
                    </Text>
                  </div>
                </PopoverSurface>
              </Popover>
            ) : (
              <Text size={200} style={{ color: tokens.colorPaletteRedForeground1 }}>
                Profile unavailable
              </Text>
            )}
          </div>
        </div>

        {/* Main Layout with Sidebar and Content */}
        <div className={styles.mainLayout}>
          {/* Teams-style Left Sidebar */}
          <div className={styles.sidebar}>
            <Button
              appearance="subtle"
              className={styles.sidebarButton}
              title="Activity"
              onClick={() => setCurrentPage('Activity')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <Home24Regular />
                <span style={{ fontSize: '10px' }}>Activity</span>
              </div>
            </Button>
            <Button
              appearance="subtle"
              className={styles.sidebarButton}
              title="Chat"
              onClick={() => setCurrentPage('Chat')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <Chat24Regular />
                <span style={{ fontSize: '10px' }}>Chat</span>
              </div>
            </Button>
            <Button
              appearance="subtle"
              className={styles.sidebarButton}
              title="Teams"
              onClick={() => setCurrentPage('Teams')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <People24Regular />
                <span style={{ fontSize: '10px' }}>Teams</span>
              </div>
            </Button>
            <Button
              appearance="subtle"
              className={styles.sidebarButton}
              title="Apps"
              onClick={() => setCurrentPage('Apps')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <Apps24Regular />
                <span style={{ fontSize: '10px' }}>Apps</span>
              </div>
            </Button>
            <Button
              appearance="subtle"
              className={styles.sidebarButton}
              title="Settings"
              onClick={() => setCurrentPage('Settings')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <Settings24Regular />
                <span style={{ fontSize: '10px' }}>Settings</span>
              </div>
            </Button>
          </div>

          {/* Main Content Area */}
          <div className={styles.mainContent}>
            {/* Content Area */}
            <div className={styles.contentArea}>
              {renderPageContent()}
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  )
}

export default App
