const apikey = "801d7cf02daa705b67a85fbb8f08d8d5";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");

async function checkweather(city) {
    try {
        const response = await fetch(`${apiurl}${city}&appid=${apikey}&units=metric`);
        if (!response.ok) throw new Error("City not found");
        
        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    } catch (error) {
        alert("City not found. Please enter a valid city name.");
    }
}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});
