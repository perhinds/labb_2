import React from 'react'
import ReactDOM from 'react-dom/client' // Use `react-dom/client` for React 18+
import './index.css'
import App from './App'
import { WeatherProvider } from './hooks/useWeatherData'

const root = ReactDOM.createRoot(document.getElementById('root')) // Create a root for React 18+

root.render(
    <WeatherProvider>
        <App />
    </WeatherProvider>
)
