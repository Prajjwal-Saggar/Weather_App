let userWeather = document.querySelector("[userWeather]");
let searchWeather = document.querySelector("[searchWeather]");
let userSpace = document.querySelector("[userSpace]");
let searchingSpace = document.querySelector("[searchingSpace]");
// let imageWeather = document.querySelector("[image-weather]");
let submitButton = document.getElementById("submitButton");
let fetchInput = document.getElementById("fetchInput");

submitButton.addEventListener("click", () => {
  let searchedPlace = fetchInput.value;
  if (searchedPlace === "") return;
  // console.log("pressed");
  getApi2(searchedPlace);
});

async function getApi2(searchedPlace) {
  try {
    const response =
      await fetch(`http://api.weatherapi.com/v1/current.json?key=80f6e76ae215448d923101925232712&q=${searchedPlace}&aqi=yes
    `);
    const data = await response.json();
    document.querySelector(".search-main-content").style.display = "flex";
    renderDetailsSearched(data);
  } catch (err) {
    alert("Please Enter The Valid Place");
    document.querySelector(".search-main-content").style.display = "none";
  }
}

let currentTab = userWeather;
function switchTab() {
  if (currentTab == userWeather) {
    currentTab.classList.add("ac-btn");
    searchingSpace.classList.add("non-active");
  } else {
    currentTab = searchWeather;
    currentTab.classList.add("ac-btn");
  }

  userWeather.addEventListener("click", () => {
    if (currentTab == userWeather) return;
    currentTab.classList.remove("ac-btn");
    searchingSpace.classList.add("non-active");
    document.querySelector(".search-main-content").style.display = "none";
    currentTab = userWeather;
    currentTab.classList.add("ac-btn");
    userSpace.classList.remove("non-active");
  });
  searchWeather.addEventListener("click", () => {
    if (currentTab == searchWeather) return;
    currentTab.classList.remove("ac-btn");
    userSpace.classList.add("non-active");
    currentTab = searchWeather;
    currentTab.classList.add("ac-btn");
    searchingSpace.classList.remove("non-active");
  });
}

switchTab();
async function getApi(place) {
  const response =
    await fetch(`http://api.weatherapi.com/v1/current.json?key=80f6e76ae215448d923101925232712&q=${place}&aqi=yes
      `);
  const data = await response.json();

  // console.log(data.location.name);
  renderDetails(data);
}

function renderDetails(info) {
  document.querySelector("[cityName]").textContent = info.location.name;
  document.querySelector("[image-weather]").src =
    info?.current?.condition?.icon;
  document.querySelector("[cityTemprature]").textContent =
    info?.current?.temp_c + "°C";
  document.querySelector("[humidity]").textContent =
    info?.current?.humidity + " g/kg";
  document.querySelector("[speed]").textContent =
    info?.current?.wind_kph + " km/hr";
  document.querySelector("[quality]").textContent =
    info?.current?.air_quality.co + " (2.5PM)";
}

function renderDetailsSearched(info) {
  document.querySelector("[cityNameS]").textContent = info.location.name;
  document.querySelector("[image-weatherS]").src =
    info?.current?.condition?.icon;
  document.querySelector("[cityTempratureS]").textContent =
    info?.current?.temp_c + "°C";
  document.querySelector("[humidityS]").textContent =
    info?.current?.humidity + " g/kg";
  document.querySelector("[speedS]").textContent =
    info?.current?.wind_kph + " km/hr";
  document.querySelector("[qualityS]").textContent =
    info?.current?.air_quality.co + " (2.5PM)";
}

function getGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Please Grant The location permission");
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  // console.log(lat, long);
  reverseGeo(lat, long);
}

async function reverseGeo(lat, long) {
  let response =
    await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=50&appid=c955d5bf312e139ae7f71eeeea631b83
  `);
  let data = await response.json();

  let place = data[0].name;
  // console.log(place)
  getApi(place);
}
getGeoLocation();
