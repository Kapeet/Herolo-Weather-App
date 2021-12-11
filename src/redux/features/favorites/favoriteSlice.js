import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cities: [],
}

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addCityToFavorites: (state = initialState, action) => {
        // console.log(action);
        // console.log(state);
        if (action.type === "favorites/addCityToFavorites")
        {
            console.log(action.payload);
            let copiedValue = state.cities;
            copiedValue.push(action.payload);
            state = {
                cities: copiedValue
            } 
            console.log(JSON.stringify(state,undefined,2));
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addCityToFavorites } = favoriteSlice.actions

export default favoriteSlice.reducer