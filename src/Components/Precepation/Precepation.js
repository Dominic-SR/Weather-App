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
        // for(let i=1; i < weekDays?.length*2; i++){
        //     if(weekIndex <= i && weekDays?.length+weekIndex >= i){
        //     console.log("OOOOO",weekDays[i%weekDays.length]);
        //     }
        // }
        // for (var i=0;i<n;i++) {
        //     console.log(array[i%array.length])
        //   }

       var toDay = new Date();
       let ddd= toDay.toLocaleDateString()
            // console.log("++++++",toDay.toLocaleDateString())
            // console.log(">>>>>>",toString(ddd)?.reverse())

    //    var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
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