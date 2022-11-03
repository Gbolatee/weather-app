"use strict";

window.addEventListener("load", function () {
  let long;
  let lat;
  const location = document.querySelector(".country");
  const timeZone = document.querySelector(".time-zone");
  const temperature = document.querySelector(".temperature");
  const fahrenheit = document.querySelector(".farenheit");
  const temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  const wind = document.querySelector(".wind");
  const press = document.querySelector(".pressure");
  const humidity = document.querySelector(".humidity");
  const temperatureSection = document.querySelector(".temperature-degree");
  const degree = document.querySelector(".degree");

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(" ", "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b4f2f691501bb339ac8ce91108135f20`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp, pressure } = data.main;
          const country = data.sys.country;
          const timezone = data.timezone;
          const description = data.weather[0].description;
          const icon = "partly_cloudy_night";

          //set DOM element from the api
          location.textContent = country;
          timeZone.textContent = timezone;
          temperature.textContent = temp;
          temperatureDescription.textContent = description;
          wind.textContent = data.wind.speed;
          press.textContent = pressure / 100;
          //formular for celcius
          let celcius = temp - 273;
          //set icons
          setIcons(icon, document.querySelector(".icon"));

          //change temperature to celcius
          temperatureSection.addEventListener("click", function () {
            if (fahrenheit.textContent === "k") {
              fahrenheit.textContent = "C";
              temperature.textContent = Math.floor(celcius);
              degree.style.display = "flex";
            } else {
              fahrenheit.textContent = "k";
              temperature.textContent = temp;
              degree.style.display = "none";
            }
          });
        });
    });
  }
});
