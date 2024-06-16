import React, { useState, useEffect } from 'react'
import WeatherCard from './WeatherCard'
import { API_KEY } from '../utils/constants'

const ForecastContainer = ({ loading, setLoading, currentData, isMetric, lat, lon }) => {
  const [forecastData, setForecastData] = useState([]);
  const [forecastType, setForecastType] = useState('current');

  const searchForecast = async (numOfDays) => {
    setLoading(true);
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${isMetric ? 'metric' : 'imperial' }&appid=${API_KEY}`;
    const res = await fetch(urlForecast);
    const searchData = await res.json();

    // I had to use the "Call 5 day / 3 hour forecast data" because it is free, the "Call 16 day / daily" requires paid subscription 
    let searchDataArray = [];
    for(let i = 0; i < numOfDays; i++) {
      searchDataArray.push(searchData.list[(i * 8) + 7]);
    }

    setForecastData(searchDataArray);
    setForecastType(`${numOfDays}-day`);
    setLoading(false);
    console.log(searchDataArray);
  }

  useEffect(() => {
    if (forecastType === '3-day') {
      searchForecast(3);
    } else if (forecastType === '5-day') {
      searchForecast(5);
    }
  }, [isMetric]);

  return (
    <>
    <div>
      <button onClick={() => setForecastType('current')}>Current weather</button>
      <button onClick={() => searchForecast(3)}>Next 3 days</button>
      <button onClick={() => searchForecast(5)}>Next 5 days</button>
    </div>
    <div>{ currentData?.name }</div>
    <div>
      {
        loading
        ? 'Loading...'
        : currentData.cod !== 200
        ? currentData.message
        : forecastType === 'current'
        ? <WeatherCard data={currentData} />
        : (forecastData.map((day, index) => <WeatherCard key={index} data={day} />))
      }
    </div>
    </>
  )
}

export default ForecastContainer