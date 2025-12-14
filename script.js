const apiKey = "801d7cf02daa705b67a85fbb8f08d8d5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const input = document.querySelector(".search-input");
const btn = document.querySelector(".search-btn");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const icon = document.querySelector(".weather-icon");
const flag = document.querySelector(".flag");
const toggle = document.querySelector(".theme-toggle");

// ================= WEATHER =================
async function checkWeather(city){
    const res = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(res.status === 404){
        error.style.display = "block";
        weather.style.display = "none";
        return;
    }

    const data = await res.json();
    error.style.display = "none";
    weather.style.display = "block";

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".city").childNodes[0].textContent = data.name + " ";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    flag.innerHTML = `<img src="https://flagcdn.com/24x18/${data.sys.country.toLowerCase()}.png">`;

    const main = data.weather[0].main;
    icon.src = `images/${main.toLowerCase()}.png`;

    speak(data.name, data.main.temp, main);
}

// ================= SEARCH =================
btn.onclick = () => checkWeather(input.value);
input.addEventListener("keypress", e => {
    if(e.key === "Enter") checkWeather(input.value);
});

// ================= LOCATION =================
navigator.geolocation.getCurrentPosition(pos=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${apiKey}`)
    .then(res=>res.json())
    .then(data=>checkWeather(data.name));
});

// ================= VOICE =================
function speak(city,temp,cond){
    speechSynthesis.speak(
        new SpeechSynthesisUtterance(
            `Weather in ${city} is ${Math.round(temp)} degrees with ${cond}`
        )
    );
}

// ================= THEME =================
toggle.onclick = ()=>{
    document.body.classList.toggle("dark");
    toggle.innerHTML = document.body.classList.contains("dark") ? "☀️" : "🌙";
};
