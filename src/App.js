import './App.css';
import Searchbar from './components/Searchbar/Searchbar'
import MainCityCard from './components/MainCityCard/MainCityCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { displayCityInCard } from './redux/features/favorites/favoriteSlice';
//these are the parameters i used for the offline json data
//autocomplete query word: 'israel'
//currentconditions location key = '3493236', details = true
//5daysOfDailyForecasts - details = true, metric = true.
//api key: 

export function Homepage() {
  const MainCity = useSelector((state) => state.favorites.selectedCity);
  const dispatch = useDispatch();
  const [userQuery, setUserQuery] = useState(''); //This is what the user types in the searchbar input.
  const [isSearchFormSubmitted, setSearchFormSubmitted] = useState(false);
  const [APIdata, setAPIdata] = useState({
    locations: [],
    locationKeys: []
  });

  const onInputSubmitted = (event) => {
    event.preventDefault();
    let selectedCity = {
      name: userQuery,
      temperature: null,
      weatherText: null,
    };
    console.log(APIdata);
    dispatch(displayCityInCard(selectedCity));
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
         <MainCityCard MainCity={MainCity} locationKey={APIdata.locationKeys[0] ? APIdata.locationKeys[0] : '215854'}/> 
    </div>
  );
}

export function Favorites() {
  const favorites = useSelector((state) => state.favorites.cities);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <header className="favoritesHeader">
        <h1>My Favorite Cities</h1>

      </header>
      <ul className="favorites-list">
      {favorites.map(city => {
        return (
          <Link key={city.name} to="/" onClick={() => {
              let selectedCity = {            
                name: city.name,
                temperature: city.temp,
                weatherText: city.text
              };
              dispatch(displayCityInCard(selectedCity));
          }}>
          <li className="favoriteCity">
              <h1>{city.name}</h1>
              <p>{city.temp}</p>
              <p>{city.text}</p>
          </li>
          </Link>
        )
      })}
      </ul>
    </div>
  );
}

