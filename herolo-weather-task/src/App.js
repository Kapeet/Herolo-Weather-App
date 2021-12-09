import logo from './logo.svg';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar'
import MainCityCard from './components/MainCityCard/MainCityCard';
import { useEffect, useState } from 'react';
//these are the parameters i used for the offline json data
//autocomplete query word: 'israel'
//currentconditions location key = '3493236', details = true
//5daysOfDailyForecasts - details = true, metric = true.
//api key: 

export function Homepage() {
  const [userQuery, setUserQuery] = useState(''); //This is what the user types in the searchbar input.
  const [isSearchFormSubmitted, setSearchFormSubmitted] = useState(false);
  const [APIdata, setAPIdata] = useState({
    locations: [],
    currentWeather: null,
    fiveDayForecast: null,
    locationKeys: []
  });

  const onInputSubmitted = (event) => {
    console.log(event);
    event.preventDefault();
    setSearchFormSubmitted(true);
    console.log("user final query: "+userQuery);
  }

  return (
    <div className="App">
      
      <Searchbar 
        userQuery={userQuery} 
        setUserQuery={setUserQuery} 
        APIdata={APIdata} 
        setAPIdata={setAPIdata} 
        onInputSubmitted={onInputSubmitted}
        isSearchFormSubmitted={isSearchFormSubmitted}
        setSearchFormSubmitted={setSearchFormSubmitted}
        />
         {(isSearchFormSubmitted && userQuery.length) ? <MainCityCard MainCityName={userQuery} locationKey={APIdata.locationKeys[0] ? APIdata.locationKeys[0] : null}/>   : ''}
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

