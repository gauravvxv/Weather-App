import React from 'react'
import style from "../styles/Weather.module.css"
import { useState, useEffect } from 'react'

const api = {
  apiKey: "973d064f5c240ed685629b35b23e6288",
  apiBase: "https://api.openweathermap.org/data/2.5/"
}
const Weather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const defaultCity = "Delhi";

  const fetchWeather = async (city) => {

    try {
      const res = await fetch(`${api.apiBase}weather?q=${city}&units=metric&APPID=${api.apiKey}`);
      const result = await res.json();
      setWeather(result);
      setQuery('');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchWeather(defaultCity)
  }, [])



  const search = async (e) => {
    if (e.key === "Enter") {
      fetchWeather(query)
    }
  }

  const currentDate = () => {
    const date = new Date();
    const option = {weekday: 'long' , year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString(undefined,option)
  }

const getBackground = () => {
  if(weather.weather){
    const main = weather.weather[0].main.toLowerCase();
    return style[main] || ''
    }
    return ' ';
}

  return (
    <div className={`${style.main} , ${getBackground()}`}  >

      <main>
        <div className={style.inpDiv}>
          <input type="text" name="search" id="search" placeholder='search... ' value={query} onKeyPress={search} onChange={e => setQuery(e.target.value)} className={style.input} />
        </div>
      </main>

      {(typeof weather.main != "undefined") ? (
        <>
  <div  className={style.middle}>
<div>
<h1>{weather.name},{weather.sys.country}</h1>
<p>{currentDate()}</p>
</div>
</div>

        <div className={style.middle2}>
        <h1>{Math.round(weather.main.temp)}°c</h1>
        </div>
        
        <div className={style.bottom}>
         {weather.weather[0].main}
        </div>
        </>

      ) : (" ")}


    </div>
  )
}

export default Weather
