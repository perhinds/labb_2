// src/hooks/useWeatherData.js
import React, { createContext, useReducer } from 'react'

const WeatherContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_WEATHER':
            return { ...state, weatherData: action.payload }
        default:
            return state
    }
}

export const WeatherProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { weatherData: [] })

    return (
        <WeatherContext.Provider value={{ state, dispatch }}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeatherContext = () => React.useContext(WeatherContext)
