import React from "react";
import './searchbar.css';
import AutoComplete from './AutoComplete'
let suggestions = ["Tel Aviv", "Jerusalem", "XD", "Ramat Gan", "Rishon Lezion", "Bnei Brak"];
export default function Search({userQuery, setUserQuery, APIdata, setAPIdata, onInputSubmitted, isSearchFormSubmitted, setSearchFormSubmitted}){

    return (
        <form className="searchbar-form" action="/" method="get" onSubmit={onInputSubmitted}>
            <label htmlFor="header-search">
                <span className="input-label-span">Search a city...</span>
            </label>
            <button classname="searchbtn" type="submit"><img src="/search.svg" alt="Search" /></button>
            <AutoComplete 
                userQuery={userQuery} 
                setUserQuery={setUserQuery}
                suggestionsProp={suggestions} 
                onSubmit={onInputSubmitted} 
                APIdata={APIdata} 
                setAPIdata={setAPIdata}        
                isSearchFormSubmitted={isSearchFormSubmitted}
                setSearchFormSubmitted={setSearchFormSubmitted}
                />
        </form>
    )
}