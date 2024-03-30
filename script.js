let msg = document.querySelector("p");
let searchCity = document.querySelector("#icon");
let input = document.querySelector("input");
let cityDetails = document.querySelector("#cityName");
let realFeel = document.querySelector("#feelValue");
let humidity = document.querySelector("#humidityValue");
let wind = document.querySelector("#windValue");
let pressure = document.querySelector("#pressureValue");
let skyInformation = document.querySelector(".skyInformation");
let cityTemperature = document.querySelector("#temperature");
let minTemperature = document.querySelector("#minTemp");
let maxTemperature = document.querySelector("#maxTemp");
let weatherImg = document.querySelector(".skyIcon img");
let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let units = "imperial";

celsius.addEventListener("click", () => {
    if (units !== "metric") {
        units = "metric";
        let cTemperature = parseInt(cityTemperature.innerHTML);
        let minTemp = parseInt(minTemperature.innerHTML);
        let maxTemp = parseInt(maxTemperature.innerHTML);
        let feelTemp = parseInt(realFeel.innerHTML);
        let cityCel = ((cTemperature - 32) * (5 / 9)).toFixed(2);
        let minCel = ((minTemp - 32) * (5 / 9)).toFixed(2);
        let maxCel = ((maxTemp - 32) * (5 / 9)).toFixed(2);
        let realCel = ((feelTemp - 32) * (5 / 9)).toFixed(2);
        cityTemperature.innerHTML = cityCel + "°C";
        minTemperature.innerHTML = minCel + "°C";
        maxTemperature.innerHTML = maxCel + "°C";
        realFeel.innerHTML = realCel + "°C";
    }
})
fahrenheit.addEventListener("click", () => {
    if (units !== "imperial") {
        units = "imperial";
        let cTemperature = parseInt(cityTemperature.innerHTML);
        let minTemp = parseInt(minTemperature.innerHTML);
        let maxTemp = parseInt(maxTemperature.innerHTML);
        let feelTemp = parseInt(realFeel.innerHTML);
        let cityCel = ((cTemperature * (9 / 5)) + 32).toFixed(2);
        let minCel = ((minTemp * (9 / 5)) + 32).toFixed(2);
        let maxCel = ((maxTemp * (9 / 5)) + 32).toFixed(2);
        let realCel = ((feelTemp * (9 / 5)) + 32).toFixed(2);
        cityTemperature.innerHTML = cityCel + "°F";
        minTemperature.innerHTML = minCel + "°F";
        maxTemperature.innerHTML = maxCel + "°F";
        realFeel.innerHTML = realCel + "°F";
    }
})


const dateUpdation = () => {
    let today = new Date();
    let dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = today.getDay();
    let month = today.getMonth();
    let date = today.getDate();
    let year = today.getFullYear();
    let time = new Date().toLocaleTimeString();
    // let min = today.getMinutes();
    // if (min < 10) {
    //     min = `${0}${min}`;
    // }
    // if (hour < 10) {
    //     hour = `${0}${hour}`;
    // }
    msg.innerText = `${dayList[day]}, ${monthList[month]} ${date}, ${year} at ${time}`;
}

const weatherReport = async () => {
    let city = input.value;
    const url = `https://open-weather13.p.rapidapi.com/city/${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8559fa5d8emshde87b32e54780a5p13249djsnf55f9f552e56',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        cityNameUpdate(result)
        temperature(result);
        skyDetails(result);
        weatherImage(result);
        moreWeatherDetails(result);
    } catch (error) {
        console.error(error);
    }
}

const cityNameUpdate = (result) => {
    const cityName = result.name;
    const countryName = result.sys.country;
    cityDetails.innerHTML = `${cityName}, ${countryName}`;

}

const moreWeatherDetails = (result) => {
    let realFeelValue = result.main.feels_like;
    let humidityValue = result.main.humidity;
    let windSpeed = result.wind.speed;
    let pressureValue = result.main.pressure;
    humidity.innerHTML = `${humidityValue} %`;
    wind.innerHTML = `${windSpeed} km/h`;
    pressure.innerHTML = `${pressureValue} hpa`;
    realFeel.innerHTML = `${realFeelValue}°F`;
}

const skyDetails = (result) => {
    let sky = result.weather[0].main;
    skyInformation.innerHTML = `${sky}`;
}

const temperature = (result) => {
    cityTemperature.innerHTML = `${result.main.temp}` + `°F`;
    minTemperature.innerHTML = `${result.main.temp_min}°F`;
    maxTemperature.innerHTML = `${result.main.temp_max}°F`;
}

const weatherImage = (result) => {
    if (result.weather[0].main === "Clear") {
        weatherImg.src = "clear.png";
    } else if (result.weather[0].main === "Clouds") {
        weatherImg.src = "clouds.png";
    } else if (result.weather[0].main === "Drizzle") {
        weatherImg.src = "drizzle.png";
    } else if (result.weather[0].main === "Mist") {
        weatherImg.src = "mist.png";
    } else if (result.weather[0].main === "Rain") {
        weatherImg.src = "rain.png";
    } else if (result.weather[0].main === "Snow") {
        weatherImg.src = "snow.png";
    }
}

searchCity.addEventListener("click", (evt) => {
    evt.preventDefault();
    dateUpdation();
    weatherReport();
})

window.addEventListener("load", () => {
    dateUpdation();
    // weatherReport();
});
