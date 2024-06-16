import React, { useEffect } from 'react'
import { API_KEY } from '../utils/constants'

const SearchField = ({ setCurrentData, location, setLocation, isMetric, setIsMetric, setLoading, setLat, setLon }) => {

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  }

  const handleUnitsChange = () => {
    setIsMetric(!isMetric);
  }

  const searchLocation = async () => {
    if (location.trim() !== '') {
      setLoading(true);
      const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${isMetric ? 'metric' : 'imperial' }&appid=${API_KEY}`;
      let res = await fetch(urlCurrent);
      let searchData = await res.json();

      if (searchData.cod !== 200) {
        // zip code example - 90210,US
        // TODO: add regex validation for zip code
        const urlZip = `http://api.openweathermap.org/geo/1.0/zip?zip=${location}&units=${isMetric ? 'metric' : 'imperial' }&appid=${API_KEY}`;
        res = await fetch(urlZip);
        searchData = await res.json();
      }

      if (searchData.cod === 200) {
        setLat(searchData.coord.lat);
        setLon(searchData.coord.lon);
      }

      setCurrentData(searchData);
      setLoading(false);
      console.log(searchData);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  }

  useEffect(() => {
    searchLocation();
  }, [isMetric]);

  return (
    <div className='search-bar'>
      <input
        type="text"
        placeholder='Enter location'
        value={location}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <i className="fa-solid fa-magnifying-glass" onClick={searchLocation}></i>
      <button onClick={handleUnitsChange}>
        {`Change to ${isMetric ? 'Fahrenheit' : 'Celsius'}`}
      </button>
    </div>
  )
}

export default SearchField