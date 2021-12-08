import logo from './logo.svg';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar'
import { useEffect, useState } from 'react';
//these are the parameters i used for the offline json data
//autocomplete query word: 'israel'
//currentconditions location key = '3493236', details = true
//5daysOfDailyForecasts - details = true, metric = true.
//api key: 

export function Homepage() {
  const [userQuery, setUserQuery] = useState(''); //This is what the user types in the searchbar input.
  const [APIdata, setAPIdata] = useState({
    locations: null,
    currentWeather: null,
    fiveDayForecast: null
  });
  useEffect(() => {
  },[]);
  return (
    <div className="App">
      <Searchbar userQuery={userQuery} setUserQuery={setUserQuery} APIdata={APIdata} setAPIdata={setAPIdata}/>
    </div>
  );
}

export function Favorites() {
  return (
    <div className="App">
      Favorites
    </div>
  );
}

