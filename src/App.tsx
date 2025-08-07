import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Office365UsersService } from './Services/Office365UsersService'
import type { GraphUser_V1 } from './Models/Office365UsersModel'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<GraphUser_V1 | null>(null)
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
    <>
      {/* User Profile Card */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: '#1a1a1a',
        border: '1px solid #646cff',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 2px 8px rgba(100, 108, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '200px'
      }}>
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#2a2a2a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {userPhoto ? (
                <img
                  src={`data:image/jpeg;base64,${userPhoto}`}
                  alt="User profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '18px', color: '#999' }}>
                  {user.givenName?.[0] || user.displayName?.[0] || '?'}
                </span>
              )}
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>
                {user.displayName || `${user.givenName || ''} ${user.surname || ''}`.trim()}
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                ({user.mail})
              </div>
            </div>
          </>
        ) : (
          <div style={{ color: '#ff6b6b', fontSize: '12px' }}>
            {error ? `Error: ${error}` : 'Failed to load profile'}
          </div>
        )}
      </div>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
