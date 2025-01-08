import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import Weather from './Components/Weather/Weather';
import Precepation from './Components/Precepation/Precepation';
import { Services } from './Services'
import LocationPopUp from './Components/LocationPopUp/LocationPopUp';

function App() {
    const [lat, setLat] = useState();
    const [long, setLong] = useState();
    const [currentDay, setCurrentDay] = useState();
    const [currentDDMonthYYYY,setcurrentDDMonthYYYY] = useState();
    const [weekDays,setWeekDays] = useState();
    const [fetchData, setFetchData] = useState();
    
    useEffect(()=>{
        let date = new Date();
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',];
        setWeekDays(weekday)
        setCurrentDay(weekday[date.getUTCDay()])

        const dayDate = date.getDate()
        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex];
        const year = date.getFullYear();
        setcurrentDDMonthYYYY(dayDate+' '+monthName+' '+year)

        navigator.geolocation.getCurrentPosition(
            position => {
              setLat(position?.coords?.latitude);
              setLong(position?.coords?.longitude);
            } 
          )

    },[])

    useEffect(()=>{
        if(lat !== undefined, long != undefined){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${Services?.ApiKey}&units=metric`)
            .then((res) => res.json())
            .then((results) => {
                setFetchData(results)
            });
        }
    },[lat,long])

  return (
    <div className="container">
        <LocationPopUp />
        <div className="weather-side">
            <Weather 
            currentDay={currentDay}
            currentDDMonthYYYY={currentDDMonthYYYY}
            fetchData={fetchData}
            lat={lat}
            long={long}
            />
            <Precepation 
            currentDay={currentDay}
            weekDays={weekDays}
            fetchData={fetchData}
            />
        </div>
    </div>
  );
}

export default App;
