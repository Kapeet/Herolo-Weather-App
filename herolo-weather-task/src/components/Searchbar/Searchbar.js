import React from "react";
import {useNavigate} from 'react-router-dom'
import './searchbar.css';
import AutoComplete from './AutoComplete'
let suggestions = ["Tel Aviv", "Jerusalem", "XD", "Ramat Gan", "Rishon Lezion", "Bnei Brak"];
export default function Search({userQuery, setUserQuery}){
    const nagivate = useNavigate();
    const onInputSubmitted = e => {
        nagivate(`?s=${userQuery}`)
        e.preventDefault()
    };

    const onInputFieldChanged = (newQuery) => {
        setUserQuery(newQuery)
    }
    return (
        <form className="searchbar-form" action="/" method="get" onSubmit={onInputSubmitted}>
            <label htmlFor="header-search">
                <span className="input-label-span">Search a city...</span>
            </label>
            {/* <input 
                value={userQuery} 
                onInput={(event) => onInputFieldChanged(event.target.value)} 
                type="text" 
                id="header-search" 
                placeholder="Tel aviv" 
                name="q" /> */} 

            <AutoComplete suggestionsProp={suggestions}/>
            <button type="submit">Search</button>
        </form>
    )
}