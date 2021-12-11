import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cities: [],
}

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addCityToFavorites: (state = initialState, action) => {
        if (action.type === "favorites/addCityToFavorites")
        {
            let copiedValue = state.cities;
            copiedValue.push(action.payload);
            state = {
                cities: copiedValue
            } 
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addCityToFavorites } = favoriteSlice.actions

export default favoriteSlice.reducer