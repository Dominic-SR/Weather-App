import React from 'react'

const Weather = ({
    currentDay,
    currentDDMonthYYYY,
    fetchData,
    lat,
    long
}) => {
  return (
    <div className="weather-gradient">
    <div className="date-container">
        <h2 className="date-dayname">{currentDay}</h2>
        <span className="date-day">{currentDDMonthYYYY}</span>
    </div>

    <div className='location-frame-container'>
        <iframe src={`https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`} frameBorder="0" ></iframe>   
    </div>

    <div className="weather-container">
        <i className="weather-icon" data-feather="sun"></i>
        <h1 className="weather-temp">{Math.round(fetchData?.main?.temp)} C</h1>
        <h3 className="weather-desc">Sunny</h3>
    </div>
    </div>
  )
}

export default Weather