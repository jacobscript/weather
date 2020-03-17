let appId = '67248dfcbbdf7651b5b83c97cefc52c1';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })

}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?blue,sky")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?clouds,sky")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?weather,rain")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?weather,storm")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?weather,snow")';
            break;

        default:
            break;
    }
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temparatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '@2x.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temparatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';

    // wind direction
    let direction = Math.floor(resultFromServer.wind.deg);
    let degree;
    if (direction > 11 && direction < 34)
        degree = 'NorthNorthEast';
    else if (direction > 33 && direction < 57)
        degree = 'NorthEast';
    else if (direction > 56 && direction < 79)
        degree = 'EastNorthEast';
    else if (direction > 78 && direction < 102)
        degree = 'East';
    else if (direction > 101 && direction < 124)
        degree = 'EastSouthEast';
    else if (direction > 123 && direction < 147)
        degree = 'SouthEast';
    else if (direction > 146 && direction < 169)
        degree = 'SouthSouthEast';
    else if (direction > 168 && direction < 192)
        degree = 'South';
    else if (direction > 191 && direction < 214)
        degree = 'SouthSouthWest';
    else if (direction > 213 && direction < 237)
        degree = 'SouthWest';
    else if (direction > 236 && direction < 259)
        degree = 'WestSouthWest';
    else if (direction > 258 && direction < 282)
        degree = 'West';
    else if (direction > 281 && direction < 304)
        degree = 'WestNorthWest';
    else if (direction > 303 && direction < 326)
        degree = 'NorthWest';
    else if (direction > 326 && direction < 348)
        degree = 'NorthNorthWest';
    else
        degree = 'North';

    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s, ' + degree;
    cityHeader.innerHTML = resultFromServer.name + ', ' + resultFromServer.sys.country;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
})