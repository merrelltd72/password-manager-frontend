import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProviders } from './providers/AppProviders.jsx'
import AuthBootstrap from './components/Authbootstrap.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <AuthBootstrap>
        <App />
      </AuthBootstrap>
    </AppProviders>
  </StrictMode>,
)
