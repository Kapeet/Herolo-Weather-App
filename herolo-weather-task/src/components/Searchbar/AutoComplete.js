import { React, useEffect, useRef, useState } from "react"
import './Autocomplete.css'
export default function AutoComplete({ suggestionsProp, onSubmit, APIdata, setAPIdata}) {
    const suggestionListElement = useRef(null);
    const [suggestionState, setSuggestionState] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
    });
    var component = null;
    const onChange = e => {

        let newSuggestions = suggestionsProp;
        let newUserInput = e.target.value;
        if (newUserInput.length > 0)
        {
            fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${newUserInput}`)
            .then(response => response.json())
            .then(data => {
                let locations = data.map(item => {return item.LocalizedName});
                setAPIdata({
                    locations: locations,
                    ...APIdata
                });
                let copiedFilteredSuggestions = locations.filter(suggestion => suggestion.toLowerCase().indexOf(newUserInput.toLowerCase()) > -1);
                setSuggestionState({
                    activeSuggestion: 0,
                    filteredSuggestions: copiedFilteredSuggestions,
                    showSuggestions: true,
                    userInput: newUserInput
                });
            });
        }
        else
        {
            setSuggestionState({
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: true,
                userInput: newUserInput
            });
        }
       
        
    };

    const onClickedSuggestion = e => {
        setSuggestionState({
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: e.target.value
        });
        onSubmit();
    }
    
    const onKeyDown = e => {
        let newActiveSuggestion = suggestionState.activeSuggestion;
        let newFilteredSuggestions = suggestionState.filteredSuggestions;
        let newUserInput = suggestionState.userInput;

        console.log(newActiveSuggestion+" / "+newFilteredSuggestions.length);
        if (e.keyCode === 13) { //check if user pressed the 'enter' key.
            setSuggestionState({
                activeSuggestion: newActiveSuggestion,
                showSuggestions: false,
                filteredSuggestions: newFilteredSuggestions,
                userInput: newFilteredSuggestions[newActiveSuggestion]
            });
        }
        else if (e.keyCode === 38) { //otherwise, check if the user pressed the 'Up arrow' key.
            if (newActiveSuggestion == 0) {return;}
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
        console.log(suggestionListElement.current);
    },[suggestionListElement])
    return (
        <>
            <input 
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
                            if (suggestionState.filteredSuggestions[index] != suggestionState.filteredSuggestions[index-1])
                            {
                                return (
                                    <li className={classname} key={suggestion} onClick={onClickedSuggestion}>
                                        {suggestion}
                                    </li>
                                );
                            }
                        })               
                        :    ''
                    
                }
                 </ul>
                    
        </>
    )
}