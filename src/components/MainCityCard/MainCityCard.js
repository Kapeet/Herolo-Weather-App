import React, { useEffect, useState } from 'react';
import './MainCityCard.css'

import { useDispatch } from 'react-redux';
import { addCityToFavorites } from '../../redux/features/favorites/favoriteSlice'
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export default function MainCityCards({MainCityName, locationKey}){
    const dispatch = useDispatch(); 

    const [weatherData,setWeatherData] = useState({
        text: '',
        temperatureMetric: '',
    });
    const [fiveDayForecast, setForecast] = useState([]);

    useEffect(() => {
        //fetch weather data
        fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`)
        .then(response => response.json())
        .then(data => {
            setWeatherData({
                text: data[0].WeatherText,
                temperatureMetric: data[0].Temperature.Metric.Value + ' ' + data[0].Temperature.Metric.Unit
            });
        })
        .catch(() => setWeatherData({
            text: 'API Limit Reached, try again later.',
            temperatureMetric: '00C'
        }))

        //fetch five day forecast
        fetch(`https://dataservice.accuweather.com//forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true&metric=true`)
        .then(response => response.json())
        .then(data => {
            let newForecast = data.DailyForecasts.map(item => {
                let date = new Date(item.Date);
                let weekdayIndex = date.getDay(); //convert the date to the day of the week as a number
                return {
                    day: weekday[weekdayIndex],
                    temperatureMax: item.Temperature.Maximum.Value+' '+item.Temperature.Maximum.Unit,
                    temperatureMin: item.Temperature.Minimum.Value+' '+item.Temperature.Minimum.Unit
                }
            });
            
            setForecast(newForecast);
        })
        .catch(() => setForecast([]))
    },[]);
    return (
        <div className="div">
            <header>
                <div className="profile">
                    <h2>{MainCityName}</h2>
                    <p>{weatherData.temperatureMetric ? weatherData.temperatureMetric : '' }</p>
                </div>
                <div className="buttons">
                    <button><img src="/heart.svg" alt="Like Button"/></button>
                    <button onClick={() => {
                     let object = {
                         name: MainCityName,
                         temp: weatherData.temperatureMetric,
                         text: weatherData.text
                     }
                     alert(MainCityName+" Has been added to Favorites!");
                     dispatch(addCityToFavorites(object))
                    }}>Add to Favorites</button>
                </div>
            </header>
            <h1 className="forecast-text">{weatherData.text ? weatherData.text : ''}</h1>
            <ul className="cityList">
                {fiveDayForecast.map(forecast => {
                    return (
                        <li>
                            <div>

                            <h1>{forecast.day}</h1>
                            <p>Max: {forecast.temperatureMax}</p>
                            <p>Min: {forecast.temperatureMin}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}