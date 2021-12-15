const api = {
    url: 'https://dataservice.accuweather.com',
    getLocations: async function(query){
        const response = await fetch(`${api.url}/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${query}`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response.json();
    },
    getWeatherData: function(locationKey){
        const response = fetch(`${api.url}/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        return response.json();
    },
    getFiveDayForecast: function(locationKey){
        const response = fetch(`${api.url}/forecasts/v1/daily/5day/${locationKey}?apikey=${process.env.REACT_APP_API_KEY}&details=true&metric=true`, {
            method: "GET",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        return response.json();
    },
}

export default api;