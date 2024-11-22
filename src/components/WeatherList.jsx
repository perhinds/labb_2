// src/components/WeatherList.jsx
import React from 'react'
import WeatherCard from './WeatherCard'

const WeatherList = ({ weatherData }) => {
    console.log('Weather Data in WeatherList:', weatherData) // Log the data to check

    if (!weatherData || weatherData.length === 0) {
        return <p>No weather data available.</p>
    }

    return (
        <div>
            {weatherData.map((weather, index) => (
                // Use a unique identifier for the key (e.g. weather.time)
                <WeatherCard key={index} weather={weather} />
            ))}
        </div>
    )
}

export default WeatherList
