import React, { useEffect, useState } from 'react';
import "./current-weather.css";
const CurrentWeather = ({data}) => {
    const [weatherIcon,setWeatherIcon]=useState('')

    useEffect(()=>{
        setWeatherIcon(data.weather[0].icon)
    },[data.weather, weatherIcon])

    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.city}</p>

                    <p className="weather-des">{data.weather[0].description}</p>
                </div>
                <img alt={weatherIcon} className="icon"  src={`/icons/${weatherIcon}.png`}  />
            </div>
            <div className="bottom">
                <p className="temperature">{Math.round(data.main.temp)}°C</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-label">{Math.round(data.main.feels_like)}°C</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-label">{Math.round(data.wind.speed)} km/h</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-label">{Math.round(data.main.humidity)}%</span>
                    </div>
                    <div className="parameter-row">.
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-label">{Math.round(data.main.pressure)} hpa</span>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default CurrentWeather;