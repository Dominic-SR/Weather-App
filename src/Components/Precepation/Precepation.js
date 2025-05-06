import React,{useState,useEffect} from 'react'
import { Services } from '../../Services'

const Precepation = ({
    currentDay,
    weekDays,
    fetchData,
    lat,
    long
}) => {

    const [upcomingDaysm, setUpcomingDays] = useState();
    const [upComingWeathers, setUpcommingWeathers] = useState([])
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


  fetch(`${Services?.API_PATH}/forecast?lat=${lat}&lon=${long}&appid=10056859e5ff89339a59bcb8c746f63d&units=metric`)
  .then(response => response.json())
  .then(data => {

    const ComingWeathers = [];

    data.list.map((item,indx) => {
      if(indx <= 5){
        ComingWeathers.push(item)
      }
    });
    setUpcommingWeathers(ComingWeathers)
  })
  .catch(error => console.error("Error fetching forecast:", error));

    
    },[lat, long])
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
     

            {upComingWeathers?.map((item, index) => (
            <li className="active">
                <i className="day-icon" data-feather="sun"></i>
                <span className="day-name">{item?.dt_txt.split(" ")[1].split(':').slice(0, 2).join(':')}</span>
                <span className="day-temp">{item?.main?.temp} C</span>
                <span className="day-name">{item?.weather[0]?.main}</span>

            </li>))}
            <div className="clear"></div>
        </ul>
    </div>

    <div className="location-container">
        <button className="location-button">
            <i data-feather="map-pin"></i>
            <span>Change Date</span>
        </button>
    </div>
</div>
  )
}

export default Precepation