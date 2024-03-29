const apiKey = "f467b2924573d791a3bca38716ad0bce"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")

const weatherIcon = document.querySelector(".weather-icon")
const cityInput = document.getElementById("cityInput")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
                var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "mph";

    if (data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/cloudy.png"
    } else if (data.weather[0].main == "Clear"){
        weatherIcon.src = "images/sunny.png"
    } else if (data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png"
    } else if (data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.webp"
    } else if (data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
    } else if (data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.webp"
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value);
})

cityInput.addEventListener("keydown", (event) =>{
    if (event.key === "Enter") {
        event.preventDefault();
        checkWeather(cityInput.value)
    }
})