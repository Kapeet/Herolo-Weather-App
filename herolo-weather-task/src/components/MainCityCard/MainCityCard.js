import React, { useEffect, useState } from 'react';
import './MainCityCard.css'
export default function MainCityCards({MainCityName, locationKey}){
    // console.log(APIdata);
    const [weatherData,setWeatherData] = useState({
        text: '',
        temperature: '00C',
    });
    useEffect(() => {
        //fetch weather stuff
        fetch(`http://dataservice.accuweather.com//currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`)
        .then(response => response.json())
        .then(data => {
            setWeatherData({
                text: data[0].WeatherText,
                temperatureMetric: data[0].Temperature.Metric.Value + ' ' + data[0].Temperature.Metric.Unit
            });
            console.log(weatherData);
        });
        console.log(locationKey);
    },[])
    return (
        <div className="div">
            <header>
                <img />
                <div className="profile">
                    <h2>{MainCityName}</h2>
                    <p>{weatherData.temperatureMetric ? weatherData.temperatureMetric : 'Loading...' }</p>
                </div>
                <div className="buttons">
                    <button>like</button>
                    <button>favorite</button>
                </div>
            </header>
            <h1 className="forecast-text">{weatherData.text ? weatherData.text : "Loading Weather..."}</h1>
            <ul className="cityList">
                
            </ul>
        </div>
    )
}