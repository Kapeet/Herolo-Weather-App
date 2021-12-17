import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  cities: [],
  selectedCity: {
    name: 'Tel Aviv',
    locationKey: '215854',
    temperature: null,
    weatherText: null,
    isLiked: false,
    forecast: [],
  }
}
export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addCityToFavorites: (state = initialState, action) => {
        if (action.type === "favorites/addCityToFavorites")
        {
            let copiedValue = state.cities;
            let cityToAdd = action.payload;
            let cityAlreadyExists = copiedValue.find(city => city.name === cityToAdd.name)
            if (cityAlreadyExists)
            {
                alert(cityToAdd.name+" Is already favorited!");
            }
            else
            {
              copiedValue.push(cityToAdd);
              state = {
                  ...state,
                  cities: copiedValue
              } 
              alert(cityToAdd.name+" Has been added to Favorites!");
            }
        }
    },
    displayCityInCard: (state = initialState, action) => {
      if (action.type === "favorites/displayCityInCard")
      {
        let newCity = action.payload;
          return {
              ...state,
              selectedCity: newCity
          };
      }
    }
  },
})
 //TODO when clicking on a  city in favorites tab, display it's contents on the main city card with the forecast
export const { addCityToFavorites, displayCityInCard } = favoriteSlice.actions

export default favoriteSlice.reducer