import React from "react";
import {useNavigate} from 'react-router-dom'
import './searchbar.css';
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
        <form action="/" method="get" autoComplete="on" onSubmit={onInputSubmitted}>
            <label htmlFor="header-search">
                <span className="input-label-span">Search a city...</span>
            </label>
            <input 
                value={userQuery} 
                onInput={(event) => onInputFieldChanged(event.target.value)} 
                type="text" 
                id="header-search" 
                placeholder="Tel aviv" 
                name="q" />
            <button type="submit">Search</button>
        </form>
    )
}