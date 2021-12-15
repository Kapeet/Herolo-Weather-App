import React, { useEffect, useState } from 'react';
import './MainCityCard.css'

import { useDispatch, useSelector } from 'react-redux';
import { addCityToFavorites } from '../../redux/features/favorites/favoriteSlice'
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export default function MainCityCards({MainCity, locationKey}){
    const dispatch = useDispatch(); 
    // const MainCity = useSelector((state) => state.favorites.selectedCity);

    const [weatherData,setWeatherData] = useState({
        text: '',
        temperatureMetric: '',
    });
    const [fiveDayForecast, setForecast] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        if (!MainCity.temperature && !MainCity.weatherText)
        {
            //fetch weather data
            if (!MainCity.locationKey)
            {
                fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`, {signal: abortController.signal})
                .then(response => response.json())
                .then(data => {
                    setWeatherData({
                        text: data[0].WeatherText,
                        temperatureMetric: data[0].Temperature.Metric.Value + ' ' + data[0].Temperature.Metric.Unit
                    });
                })
                .catch(() => {
                    if(!abortController.signal.aborted)
                    {
                        setWeatherData({
                            text: 'API Limit Reached, try again later.',
                            temperatureMetric: '00C'
                        })
                    }
                })
            }
            else
            {
                fetch(`https://dataservice.accuweather.com/currentconditions/v1/${MainCity.locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`, {signal: abortController.signal})
                .then(response => response.json())
                .then(data => {
                    setWeatherData({
                        text: data[0].WeatherText,
                        temperatureMetric: data[0].Temperature.Metric.Value + ' ' + data[0].Temperature.Metric.Unit
                    });
                })
                .catch(() => {
                    if(!abortController.signal.aborted)
                    {
                        setWeatherData({
                            text: 'API Limit Reached, try again later.',
                            temperatureMetric: '00C'
                        })
                    }
                })
            }
        }
        else 
        {
            setWeatherData({
                text: MainCity.weatherText,
                temperatureMetric: MainCity.temperature
            })
        }

        console.log(MainCity);
        if (!MainCity.locationKey)
        {
            //fetch five day forecast
            fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true&metric=true`,{signal: abortController.signal})
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
            .catch(() => setForecast([]));
        }
        else
        {
            //fetch five day forecast
            fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${MainCity.locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true&metric=true`,{signal: abortController.signal})
            .then(response => response.json())
            .then(data => {
                console.log("data fetched with maincity locationkey");
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
            .catch(() => setForecast([]));
        }

        return function cleanup() {
            abortController.abort();
        }
        
    },[MainCity]);
    return (
        <div className="div">
            <header className="header">
                <div className="profile">
                    <h2>{MainCity.name}</h2>
                    <p>{weatherData.temperatureMetric ? weatherData.temperatureMetric : '' }</p>
                </div>
                <div className="buttons">
                    <button><img src="/heart.svg" alt="Like Button"/></button>
                    <button onClick={() => {
                     let object = {
                         name: MainCity.name,
                         locationKey: MainCity.locationKey,
                         temp: weatherData.temperatureMetric,
                         text: weatherData.text
                     }
                     dispatch(addCityToFavorites(object))
                    }}>Add to Favorites</button>
                </div>
            </header>
            <h1 className="forecast-text">{weatherData.text ? weatherData.text : ''}</h1>
            <ul className="forecastList">
                {fiveDayForecast.map(forecast => {
                    return (
                        <li key={forecast.day}>
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