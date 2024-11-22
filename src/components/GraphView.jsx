// src/components/GraphView.jsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const GraphView = ({ weatherData }) => (
    <LineChart width={600} height={300} data={weatherData}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
    </LineChart>
)

export default GraphView
