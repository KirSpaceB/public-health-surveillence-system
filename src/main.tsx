import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import InitialMap from './assets/components/InitialMap.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InitialMap/>
  </StrictMode>,
)
