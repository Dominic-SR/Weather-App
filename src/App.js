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
    const [currentTime, setCurrentTime] = useState('')
    
    useEffect(()=>{

        // get Time and minutes in 12 Hours

        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formatedMinute = minutes < 10 ? 0+minutes : minutes

        setCurrentTime(hours+":"+formatedMinute+" "+ampm)

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



            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&units=metric&appid=${Services?.ApiKey}`)
            .then(response => response.json())
            .then(data => {
              const nextSixDays = data.daily.slice(1, 7); // Skip today, get next 6
              nextSixDays.forEach(day => {
                const date = new Date(day.dt * 1000);
                const dayName = date.toLocaleDateString("en-US", { weekday: 'long' });
                console.log(`${dayName}: ${day.weather[0].description}, Temp: ${day.temp.day}°C`);
              });
            })
            .catch(err => console.error("Error fetching weather:", err));
        }


        
    },[lat,long])

  return (
    <div className='main-wrapper'>
    <div className="container">
        {/* <LocationPopUp /> */}
        <div className="weather-side">
            <Weather 
            currentDay={currentDay}
            currentDDMonthYYYY={currentDDMonthYYYY}
            fetchData={fetchData}
            lat={lat}
            long={long}
            currentTime={currentTime}
            />
            <Precepation 
            currentDay={currentDay}
            weekDays={weekDays}
            fetchData={fetchData}
            lat={lat}
            long={long}
            />
        </div>
    </div>
    </div>
  );
}

export default App;
