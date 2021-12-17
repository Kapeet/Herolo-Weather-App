import './App.css';
import Searchbar from './components/Searchbar/Searchbar'
import MainCityCard from './components/MainCityCard/MainCityCard';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { displayCityInCard } from './redux/features/favorites/favoriteSlice';


export function Homepage() {
  const MainCity = useSelector((state) => state.favorites.selectedCity);
  const dispatch = useDispatch();
  const [userQuery, setUserQuery] = useState(''); //This is what the user types in the searchbar input.
  const [isSearchFormSubmitted, setSearchFormSubmitted] = useState(false);
  const [APIdata, setAPIdata] = useState({
    locations: [],
    locationKeys: []
  });

  const [isLiked, setIsLiked] = useState(false);

  const onInputSubmitted = (event) => {
    event.preventDefault();
    let selectedCity = {
      name: userQuery,
      locationKey: APIdata.locationKeys[0],
      temperature: null,
      weatherText: null,
      isLiked: false,
      forecast: [],
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
         <MainCityCard MainCity={MainCity} locationKey={MainCity.locationKey ? MainCity.locationKey : '215854'} isLiked={isLiked} setIsLiked={setIsLiked}/> 
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
            console.log(city);
              let selectedCity = {            
                name: city.name,
                locationKey: city.locationKey,
                temperature: city.temp,
                weatherText: city.text,
                isLiked: city.isLiked,
                forecast: city.forecast,
              };
              dispatch(displayCityInCard(selectedCity));
          }}>
          <li className="favoriteCity">
              <h1>{city.name}</h1>
              <p>{city.temp}</p>
              <p>{city.text}</p>
              {city.isLiked ?  <img src="/heart-active.svg" alt="liked"/> : <img src="/heart.svg" alt="liked"/>}
          </li>
          </Link>
        )
      })}
      </ul>
    </div>
  );
}

