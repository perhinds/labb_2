// src/utils/fetchWeatherData.js

/**
 * Fetches weather data from SMHI API
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Array>} Processed weather data
 */
export const fetchWeatherData = async (lat, lon) => {

    const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;

    const headers = {
        'Accept': 'application/json',
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {

            throw new Error(
                `Failed to fetch weather data: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        // Validate data structure
        if (!data || !Array.isArray(data.timeSeries)) {
            throw new Error('Invalid API response structure');
        }

        // Log only in development
        if (process.env.NODE_ENV === 'development') {
            console.log('Weather API Response:', data);
        }

        // Process weather data
        const weatherData = data.timeSeries.map((item) => {

            const getParameterValue = (paramName) => {
                const param = item.parameters?.find(p => p.name === paramName);
                return param?.values?.[0] ?? 'N/A';
            };

            return {
                time: new Date(item.validTime).toISOString(),
                temperature: getParameterValue('t'),
                windSpeed: getParameterValue('ws'),
                humidity: getParameterValue('r1'),
                precipitation: getParameterValue('pmean'),
                cloudCover: getParameterValue('tcc_mean')
            };
        });

        if (!weatherData.length) {
            throw new Error('No weather data available for this location');
        }

        return weatherData;

    } catch (error) {
        // Enhanced error logging
        console.error('Weather API Error:', {
            message: error.message,
            lat,
            lon,
            timestamp: new Date().toISOString()
        });

        // Rethrow with more user-friendly message
        throw new Error(
            error.message.includes('Failed to fetch')
                ? 'Unable to connect to weather service. Please try again later.'
                : 'Error processing weather data. Please try again.'
        );
    }
};
