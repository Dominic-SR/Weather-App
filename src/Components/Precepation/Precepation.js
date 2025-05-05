import React,{useState,useEffect} from 'react'

const Precepation = ({
    currentDay,
    weekDays,
    fetchData,
    lat,
    long
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


  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${long}&lon=${long}&appid=10056859e5ff89339a59bcb8c746f63d&units=metric`)
  .then(response => response.json())
  .then(data => {

    console.log("DOOOMS",data);
    const days = {};

    // Group forecast by date
    data.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0]; // Get just the date (YYYY-MM-DD)
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(item);
    });

    // Get only the next 5 days
    const next5Days = Object.keys(days).slice(0, 5);

    next5Days.forEach(date => {
      console.log(`📅 Date: ${date}`);

      days[date].forEach(forecast => {
        const time = forecast.dt_txt.split(" ")[1];
        const temp = forecast.main.temp;
        const desc = forecast.weather[0].description;

        console.log(`🕒 ${time} | 🌡️ ${temp}°C | ${desc}`);
      });

      console.log("---------------");
    });
  })
  .catch(error => console.error("Error fetching forecast:", error));

    
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