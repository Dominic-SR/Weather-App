import React from 'react'

const Precepation = ({
    currentDay,
    weekDays,
    fetchData
}) => {
    
    for(let i=0; weekDays?.length > i; i++){
        // console.log("OOOOO",weekDays[i]);
    }
console.log(":::::",fetchData);
  return (
    <div className="info-side">
    <div className="today-info-container">
        <div className="today-info">
            <div className="precipitation">
                <span className="title">WEATHER</span>
                <span className="value">{fetchData?.weather[0]?.main}</span>
                <div className="clear"></div>
            </div>
            
            <div className="wind">
                <span className="title">WIND</span>
                <span className="value">{fetchData?.wind?.speed} km/H</span>
                <div className="clear"></div>
            </div>
        </div>
    </div>

    <div className="week-container">
        <ul className="week-list">
        <li className="active">
                <i className="day-icon" data-feather="sun"></i>
                <span className="day-name">Mon</span>
                <span className="day-temp">29 C</span>
            </li>
            
            <li className="active">
                <i className="day-icon" data-feather="sun"></i>
                <span className="day-name">Tue</span>
                <span className="day-temp">29 C</span>
            </li>

            <li className="active">
                <i className="day-icon" data-feather="sun"></i>
                <span className="day-name">Wed</span>
                <span className="day-temp">21 C</span>
            </li>

            <li className="active">
                <i className="day-icon" data-feather="sun"></i>
                <span className="day-name">Thu</span>
                <span className="day-temp">18 C</span>
            </li>

            <li className="active">
                <i className="day-icon" data-feather="sun"></i>
                <span className="day-name">Fri</span>
                <span className="day-temp">25 C</span>
            </li>

            <li className="active">
                <i className="day-icon" data-feather="sun"></i>
                <span className="day-name">Sat</span>
                <span className="day-temp">25 C</span>
            </li>
            <div className="clear"></div>
        </ul>
    </div>

    <div className="location-container">
        <button className="location-button">
            <i data-feather="map-pin"></i>
            <span>Change location</span>
        </button>
    </div>
</div>
  )
}

export default Precepation