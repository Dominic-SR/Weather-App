import React,{useState,useEffect} from 'react'

const Precepation = ({
    currentDay,
    weekDays,
    fetchData
}) => {

    const [upcomingDaysm, setUpcomingDays] = useState();
    const checkDay = (event) =>{
       return event === currentDay
    }
    
    let weekIndex = weekDays?.findIndex(checkDay);


    useEffect(()=>{
     
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = new Date();
        let nextFiveDays = [];

        for (let i = 1; i <= 6; i++) {
        const nextDay = new Date();
        nextDay.setDate(today.getDate() + i);
        const dayName = daysOfWeek[nextDay.getDay()];
        nextFiveDays.push(dayName);
        }

        setUpcomingDays(nextFiveDays)
    
    },[])
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
     

            {upcomingDaysm?.map((day, index) => (
            <li className="active">
                <i className="day-icon" data-feather="sun"></i>
                <span className="day-name">{day}</span>
                <span className="day-temp">29 C</span>
            </li>))}
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