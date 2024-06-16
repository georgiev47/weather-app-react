import React, { useState } from 'react'
import SearchField from './components/SearchField'
import ForecastContainer from './components/ForecastContainer';

const App = () => {
  const [currentData, setCurrentData] = useState([]);
  const [location, setLocation] = useState('Sofia');
  const [isMetric, setIsMetric] = useState(true); // Metric shows Celsius, Imperial shows Fahrenheit
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  return (
    <div className='container'>
      <SearchField
        currentData={currentData}
        setCurrentData={setCurrentData}
        location={location}
        setLocation={setLocation}
        isMetric={isMetric}
        setIsMetric={setIsMetric}
        setLoading={setLoading}
        setLat={setLat}
        setLon={setLon}
      />
      <ForecastContainer
        loading={loading}
        setLoading={setLoading}
        currentData={currentData}
        setCurrentData={setCurrentData}
        isMetric={isMetric}
        lat={lat}
        lon={lon}
      />
    </div>
  )
}

export default App