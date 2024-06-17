import React, { useState, useEffect } from 'react'
import { API_KEY } from '../utils/constants'

const SearchField = ({ setCurrentData, location, setLocation, isMetric, setIsMetric, setLoading, setLat, setLon }) => {
  const [favoriteCities, setFavoriteCities] = useState(localStorage.favoriteCities);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  }

  const handleUnitsChange = () => {
    setIsMetric(!isMetric);
  }

  const searchLocation = async (city) => {
    if (location.trim() !== '') {
      setLoading(true);
      const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city ? city : location}&units=${isMetric ? 'metric' : 'imperial' }&appid=${API_KEY}`;
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
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  }

  const handleFavoriteCity = () => {
    if (localStorage.favoriteCities) {
      let storedCities = JSON.parse(localStorage.favoriteCities);
      if (!storedCities.includes(location)) {
        storedCities.push(location);
        localStorage.favoriteCities = JSON.stringify(storedCities);
      }
    } else {
      localStorage.favoriteCities = JSON.stringify([location]);
    }
    setFavoriteCities(localStorage.favoriteCities);
  }

  const handleFavoriteSearch = (city) => {
    setLocation(city);
    searchLocation(city);
  }

  useEffect(() => {
    searchLocation();
  }, [isMetric]);

  return (
    <>
      <div className='search-container'>
        <div className='search-bar'>
          <input
            type="text"
            placeholder='Enter location'
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={searchLocation}></i>
        </div>
        <button onClick={handleFavoriteCity}>
          <i className="fa-regular fa-star"></i> {`Favorite this city`}
        </button>
        <button onClick={handleUnitsChange}>
          {`Change to ${isMetric ? 'Fahrenheit' : 'Celsius'}`}
        </button>
      </div>
      {favoriteCities && <div className='favorites-title'>Favorite locations</div>}
      <div className='favorites-btns'>
        {favoriteCities && 
          JSON.parse(favoriteCities).map((city, index) => 
            <button key={index} onClick={() => handleFavoriteSearch(city)}>{city}</button>
          )
        }
      </div>
    </>
  )
}

export default SearchField