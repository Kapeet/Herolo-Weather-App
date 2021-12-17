import { configureStore } from '@reduxjs/toolkit'

import favoritesReducer from '../features/favorites/favoriteSlice'
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
})