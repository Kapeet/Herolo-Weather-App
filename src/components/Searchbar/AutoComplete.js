import { React, useEffect, useRef, useState } from "react"
import './Autocomplete.css'
export default function AutoComplete({ setUserQuery, onSubmit, setAPIdata, setSearchFormSubmitted}) {
    const suggestionListElement = useRef(null);

    const [suggestionState, setSuggestionState] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
    });
    const onChange = e => {
                
        let newUserInput = e.target.value;
        setUserQuery(newUserInput);
        if (newUserInput.length > 0)
        {
            setSearchFormSubmitted(false);
            fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${newUserInput}`)
            .then(response => response.json())
            .then(data => {
                let APIlocations = data.map(item => {return item.LocalizedName});
                let APIlocationKeys = data.map(item => {return item.Key});

                if (APIlocations != null)
                {
                    setAPIdata({
                        locations: APIlocations,
                        currentWeather: null,
                        fiveDayForecast: null,
                        locationKeys: APIlocationKeys
                    });

                    
                    let copiedFilteredSuggestions = APIlocations.filter(suggestion => suggestion.toLowerCase().indexOf(newUserInput.toLowerCase()) > -1); //filter suggestions based on user input
                    let uniqueSuggestions = copiedFilteredSuggestions.filter((item, index) => {return copiedFilteredSuggestions.indexOf(item) === index;}); //remove duplicate suggestions from the original array
                    setSuggestionState({
                        activeSuggestion: 0,
                        filteredSuggestions: uniqueSuggestions,
                        showSuggestions: true,
                        userInput: newUserInput
                    });
                }
            });
        }
        else
        {
            setSearchFormSubmitted(false);
            setSuggestionState({
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: newUserInput
            });
        }
       
        
    };

    const onClickedSuggestion = e => {
        if (e.target.value)
        {
            setSuggestionState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: e.target.value
            });
            setSearchFormSubmitted(true);
            onSubmit(e);
        }
        else
        {
            setSuggestionState({
                activeSuggestion: 0,
                showSuggestions: false,
            });
        }
      
    }
    
    const onKeyDown = e => {
        let newActiveSuggestion = suggestionState.activeSuggestion;
        let newFilteredSuggestions = suggestionState.filteredSuggestions;
        if (e.keyCode === 13) { //check if user pressed the 'enter' key.
            let selectedSuggestion = newFilteredSuggestions[newActiveSuggestion];
            if (selectedSuggestion)
            {
                setSuggestionState({
                    activeSuggestion: newActiveSuggestion,
                    showSuggestions: false,
                    filteredSuggestions: newFilteredSuggestions,
                    userInput: selectedSuggestion
                });
                setUserQuery(selectedSuggestion);
            }
        }
        else if (e.keyCode === 38) { //otherwise, check if the user pressed the 'Up arrow' key.
            if (newActiveSuggestion === 0) {return;}
            setSuggestionState({
                ...suggestionState,
                activeSuggestion: newActiveSuggestion - 1,
            });
        }
        else if (e.keyCode === 40) { //else, check if the user pressed the 'Down arrow' key.
            if (newActiveSuggestion-1 >= newFilteredSuggestions.length) {return;} 
            
            setSuggestionState({
                ...suggestionState,
                activeSuggestion: (newActiveSuggestion+1),
            });
            
        }
    }

    useEffect(() => {
    },[suggestionListElement])
    return (
        <>
            <input className="autocomplete-input"
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={suggestionState.userInput}
                placeholder="Tel aviv"
                />
                <ul className="suggestions" ref={suggestionListElement}>
                {
                    (suggestionState.showSuggestions && suggestionState.userInput && suggestionState.filteredSuggestions.length) 
                    ?        
                        suggestionState.filteredSuggestions.map((suggestion, index) => {
                            let classname;
                            if (index===suggestionState.activeSuggestion) {
                                classname = "suggestion-active";
                            }
                            if (suggestionState.filteredSuggestions[index] !== suggestionState.filteredSuggestions[index-1])
                            {
                                return (
                                    <li className={classname} key={suggestion} onClick={onClickedSuggestion}>
                                        {suggestion}
                                    </li>
                                );
                            }
                            else {return '';}
                        })               
                        :    ''
                    
                }
                 </ul>
                    
        </>
    )
}