import { React, useEffect, useState } from "react"
import './Autocomplete.css'
export default function AutoComplete({ suggestionsProp }) {
    const [suggestionState, setSuggestionState] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
    });
    var component = null;
    const onChange = e => {
        console.log(component)
        console.log(e.currentTarget.value);
        // let newSuggestions = suggestionsProp;
        let newUserInput = e.currentTarget.value;
        let newFilteredSuggestions = suggestionsProp.filter(suggestion => suggestion.toLowerCase().indexOf(newUserInput.toLowerCase()) > -1);

        setSuggestionState({
            activeSuggestion: 0,
            filteredSuggestions: newFilteredSuggestions,
            showSuggestions: true,
            userInput: newUserInput
        });
    };

    const onClickedSuggestion = e => {
        setSuggestionState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.value
        });
    }

    const onKeyDown = e => {
        //make a copy of the immutable state variables.
        let newActiveSuggestion = suggestionState.activeSuggestion;
        let newFilteredSuggestions = suggestionState.filteredSuggestions;

        if (e.KeyCode === 13) { //check if user pressed the 'enter' key.
            setSuggestionState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: newFilteredSuggestions[newActiveSuggestion]
            })
        }
        else if (e.KeyCode === 38) { //otherwise, check if the user pressed the 'Up arrow' key.
            if (newActiveSuggestion === 0) {return;} //exit function if there are no more active suggestions
            setSuggestionState({ //index - 1
                activeSuggestion: newActiveSuggestion - 1
            });
        }
        else if (e.KeyCode === 40) { //else, check if the user pressed the 'Down arrow' key.
            if (newActiveSuggestion-1 === newFilteredSuggestions.length) {return;} //exit function if there are no more active suggestions
            setSuggestionState({ //index + 1
                activeSuggestion: newActiveSuggestion+1
            })
        }
    }

    useEffect(() => {
        //create the suggestion list component
        var copiedState = suggestionState;
        console.log(copiedState)
        if (copiedState.showSuggestions && copiedState.userInput) {
            if (copiedState.filteredSuggestions.length) {
                component = (
                    <ul className="suggestion">
                        {copiedState.filteredSuggestions.map((suggestion, index) => {
                            let classname;
                            if (index===copiedState.activeSuggestion) {
                                classname = "suggestion-active";
                            }
                            return (
                                <li className={classname} key={suggestion} onClick={onClickedSuggestion}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
            else {
                component = (
                    <div>No suggestions available.</div>
                )
            }
        }
    })
    return (
        <>
            <input 
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={suggestionState.userInput}
                placeholder="Tel aviv"
                />
                {
                    (suggestionState.showSuggestions && suggestionState.userInput && suggestionState.filteredSuggestions.length) 
                    ?
                                <ul className="suggestions">
                                    {suggestionState.filteredSuggestions.map((suggestion, index) => {
                                        let classname;
                                        if (index===suggestionState.activeSuggestion) {
                                            classname = "suggestion-active";
                                        }
                                        return (
                                            <li className={classname} key={suggestion} onClick={onClickedSuggestion}>
                                                {suggestion}
                                            </li>
                                        );
                                    })}
                                </ul>
                    
                        
                        :    ''
                    
                }
        </>
    )
}