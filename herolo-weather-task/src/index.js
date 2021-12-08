import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Homepage, Favorites} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/navbar'

ReactDOM.render(
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
