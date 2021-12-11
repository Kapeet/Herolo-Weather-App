import './App.css';
import Searchbar from './components/Searchbar/Searchbar'
import MainCityCard from './components/MainCityCard/MainCityCard';
import { useState } from 'react';

import { useSelector } from 'react-redux';
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
    locationKeys: []
  });

  const onInputSubmitted = (event) => {
    event.preventDefault();
    setSearchFormSubmitted(true);
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
  const favorites = useSelector((state) => state.favorites.cities);
  return (
    <div className="App">
      <header className="favoritesHeader">
        <h1>My Favorite Cities</h1>

      </header>
      <ul className="favorites-list">
      {favorites.map(city => {
        return (
          <li  key={city.name}  >
              <h1>{city.name}</h1>
              <p>{city.temp}</p>
              <p>{city.text}</p>
          </li>
        )
      })}
      </ul>
    </div>
  );
}

