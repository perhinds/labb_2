// src/components/WeatherCard.jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const cardStyle = css`
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 1rem;
`

const WeatherCard = ({ weather }) => {

      // Kontrollera om weather är undefined eller null
    if (!weather) {
        return <div>Data saknas</div>;
    }
    // Kontrollera om varje parameter finns
    const temperature =
        weather.temperature !== 'N/A' ? weather.temperature : 'Data saknas'
    const windSpeed =
        weather.windSpeed !== 'N/A' ? weather.windSpeed : 'Data saknas'

    return (
        <div css={cardStyle}>
            <h3>Väder Information</h3>
            <p>Temperature: {temperature}°C</p>
            <p>Wind Speed: {windSpeed} m/s</p>
        </div>
    )
}

export default WeatherCard
