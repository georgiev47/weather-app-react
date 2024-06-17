import React from 'react'

const WeatherCard = ({ data, isMetric }) => {
  let date = '';
  if (data.dt_txt) {
    date = data.dt_txt.split(' ')[0];
  }

  return (
    <div className='weather-card'>
      <div><img src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`} alt="Weather icon" /></div>
      <div>
        <div>{ data.dt_txt ? date : 'Now' }</div>
        <div className='description'>{ data?.weather[0]?.description }</div>
      </div>
      <div>{ data.main.temp && (`${Math.round(data.main.temp)}\u00B0${isMetric? 'C' : 'F' }`) }</div>
    </div>
  )
}

export default WeatherCard