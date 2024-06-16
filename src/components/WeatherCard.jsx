import React from 'react'

const WeatherCard = ({ data }) => {
  return (
    <div>
      <div>{ data?.main?.temp }</div>
      <div>{ data?.weather[0]?.description }</div>
    </div>
  )
}

export default WeatherCard