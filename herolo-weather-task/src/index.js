import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Homepage, Favorites} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/navbar'
// import { useSelector,useDispatch } from 'react-redux';
// import { addCityToFavorites } from '../redux/features/favorites/favoriteSlice'

import { store } from './redux/app/store'
import { Provider } from 'react-redux'
ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
