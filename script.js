const input = document.getElementById("input")
const search = document.getElementById("search")
const weatherImg = document.querySelector(".weatherImg")
const temperature = document.getElementById("temperature")
const weatherWords = document.getElementById("words")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")
const allBody = document.querySelector(".main-content") 
const locationNotF = document.querySelector(".locationNotF")

async function checkWeather(city) {
    const apiKey = "8591ec83e6140850ce9d11264dad7fd1"
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const weatherData = await fetch(`${apiURL}`).then(response => response.json())
    

    if(weatherData.cod === `404`){
        weatherImg.src = "/assets/404.png"
        locationNotF.style.display = "flex"
        allBody.style.display = "none"
        return
    }

    locationNotF.style.display = "none"
    allBody.style.display = "flex"
    temperature.innerHTML = Math.round(`${weatherData.main.temp - 273.15}`) + `<sup>°C</sup>`
    console.log(weatherData)
    weatherWords.innerHTML = weatherData.weather[0].description
    humidity.innerHTML = weatherData.main.humidity + "%"
    wind.innerHTML = weatherData.wind.speed + "km/H"

    switch(weatherData.weather[0].main){
        case 'Clear':
            weatherImg.src = "/assets/clear.png"
            break;
        case 'Clouds', 'Haze':
            weatherImg.src = "/assets/cloud.png"
            break;
        case 'Mist':
            weatherImg.src = "/assets/mist.png"
            break;
        case 'Rain':
            weatherImg.src = "/assets/rain.png"
            break;
        case 'Snow':
            weatherImg.src = "/assets/snow.png"
            break;        
    }
}

search.addEventListener('click', () => {
    checkWeather(input.value)
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkWeather(input.value)
    }
  });






