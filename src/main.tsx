import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PowerProvider from './PowerProvider.tsx'
import { PageAlignmentProvider } from './contexts/PageAlignmentContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PowerProvider>
      <PageAlignmentProvider>
        <App />
      </PageAlignmentProvider>
    </PowerProvider>
  </StrictMode>,
)
