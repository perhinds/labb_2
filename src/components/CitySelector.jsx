//src/components/CitySelector.jsx
const cities = [
    { name: 'Göteborg', lon: 11.9746, lat: 57.7089 },
    { name: 'Stockholm', lon: 18.0686, lat: 59.3293 },
    { name: 'Malmö', lon: 13.0038, lat: 55.6059 }
]

const CitySelector = ({ onCityChange }) => (
    <select onChange={(e) => onCityChange(cities[e.target.value])}>
        {cities.map((city, index) => (
            <option key={index} value={index}>
                {city.name}
            </option>
        ))}
    </select>
)

export default CitySelector
