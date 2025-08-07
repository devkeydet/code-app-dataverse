import { useState, useEffect } from 'react'
import './App.css'
import { Office365UsersService } from './Services/Office365UsersService'
import type { GraphUser_V1 } from './Models/Office365UsersModel'
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardPreview,
  Text,
  Title1,
  Title2,
  Body1,
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
    ...shorthands.padding('24px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.gap('24px'),
  },
  welcomeCard: {
    width: '400px',
    maxWidth: '90%',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('16px'),
    ...shorthands.margin('24px', '0'),
  },
  logo: {
    height: '48px',
    width: '48px',
  },
  counterCard: {
    width: '300px',
    maxWidth: '90%',
    textAlign: 'center',
  },
  errorAlert: {
    width: '400px',
    maxWidth: '90%',
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
    border: `1px solid ${tokens.colorPaletteRedBorder1}`,
    borderRadius: tokens.borderRadiusMedium,
    ...shorthands.padding('12px', '16px'),
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
            <Text size={500} weight="semibold" style={{ marginLeft: '24px' }}>Power Platform Code App using Dataverse (Fluent / Teams inspired) </Text>
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
              title="Home"
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <Home24Regular />
                <span style={{ fontSize: '10px' }}>Home</span>
              </div>
            </Button>
            <Button
              appearance="subtle"
              className={styles.sidebarButton}
              title="Chat"
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
              {error && (
                <div className={styles.errorAlert}>
                  <Text weight="semibold">Error loading user profile</Text>
                  <br />
                  <Text size={200}>{error}</Text>
                </div>
              )}

              <Card className={styles.welcomeCard}>
                <CardPreview>
                  <div className={styles.logoContainer}>
                    <img src="/vite.svg" className={styles.logo} alt="Vite logo" />
                    <Title1>+</Title1>
                    <img src="/src/assets/react.svg" className={styles.logo} alt="React logo" />
                  </div>
                </CardPreview>
                <CardHeader
                  header={<Title2>Welcome to your Power Platform Code App</Title2>}
                  description={
                    <Body1>
                      This app is built with React + TypeScript + Vite and integrated with Microsoft's Fluent UI design system.
                      It connects to Dataverse and Office 365 services.
                    </Body1>
                  }
                />
              </Card>

              <Card className={styles.counterCard}>
                <CardHeader
                  header={<Title2>Interactive Counter</Title2>}
                  description={
                    <Body1>
                      Test the reactivity with this simple counter example.
                    </Body1>
                  }
                />
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <Button
                    appearance="primary"
                    size="large"
                    onClick={() => setCount((count) => count + 1)}
                    style={{ marginBottom: '16px' }}
                  >
                    Count is {count}
                  </Button>
                  <br />
                  <Text size={200}>
                    Edit <code>src/App.tsx</code> and save to test HMR
                  </Text>
                </div>
              </Card>

              <Text size={200} style={{ opacity: 0.7, textAlign: 'center', maxWidth: '600px' }}>
                Click on the Vite and React logos to learn more about the technologies powering this app.
                The sidebar navigation follows Microsoft Teams design patterns for familiarity.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  )
}

export default App
