// src/App.js
import React, { useEffect, useState } from 'react'
import { useWeatherContext } from './hooks/useWeatherData'
import CitySelector from './components/CitySelector'
import GraphView from './components/GraphView'
import WeatherList from './components/WeatherList'
import { fetchWeatherData } from './utils/fetchWeatherData'

const App = () => {
    const [selectedCity, setSelectedCity] = useState({
        name: 'Göteborg',
        lat: 57.7089,
        lon: 11.9746
    })

    const { state, dispatch } = useWeatherContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const getWeatherData = async () => {
            if (!isMounted) return

            // Kontrollera att lat och lon är definierade
            if (!selectedCity.lat || !selectedCity.lon) {
                setError(
                    'Stadens latitud och longitud är inte korrekt definierade.'
                )
                return
            }

            setLoading(true)
            setError(null)

            try {
                console.log('Fetching weather data...') // Debug
                const data = await fetchWeatherData(
                    selectedCity.lat,
                    selectedCity.lon
                )
                if (isMounted) {
                    dispatch({ type: 'SET_WEATHER', payload: data })
                    console.log('Weather data fetched:', data) // Debug
                }
            } catch (err) {
                console.error('Error fetching data:', err) // Log errors
                if (isMounted) {
                    setError('Failed to load weather data')
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                    console.log('Loading finished') // Debug log
                }
            }
        }

        getWeatherData()

        return () => {
            isMounted = false
        }
    }, [selectedCity, dispatch])

    const handleCityChange = (city) => {
        setSelectedCity(city)
    }

    return (
        <div>
            <h1>Enkel väder app</h1>
            <CitySelector onCityChange={handleCityChange} />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {loading ? (
                <div>Loading weather data...</div>
            ) : (
                <>
                    <h2>Vädret i {selectedCity.name}</h2>
                    {state.weatherData && state.weatherData.length > 0 ? (
                        <>
                            <GraphView weatherData={state.weatherData} />
                            <WeatherList weatherData={state.weatherData} />
                        </>
                    ) : (
                        <p>No weather data available.</p>
                    )}
                </>
            )}
        </div>
    )
}

export default App
