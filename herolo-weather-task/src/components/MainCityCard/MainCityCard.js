import React, { useEffect } from 'react';
import './MainCityCard.css'
export default function MainCityCards({MainCityName, locationKey}){
    // console.log(APIdata);

    useEffect(() => {
        //fetch weather stuff
    },[])
    return (
        <div className="div">
            <header>
                <img />
                <div className="profile">
                    <h2>{MainCityName}</h2>
                    <p>25 C</p>
                </div>
                <div className="buttons">
                    <button>like</button>
                    <button>favorite</button>
                </div>
            </header>
            <h1 className="forecast-text">maincityCard</h1>
            <ul className="cityList">
                
            </ul>
        </div>
    )
}