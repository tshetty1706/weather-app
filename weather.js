const video = document.getElementById("bgVideo");

setInterval(() => {
  const now = new Date();
  document.getElementById("time").innerText =
    now.toLocaleString();
}, 1000);

const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
};

let checkCity =()=>{
  let city = document.getElementById("search").value;
  if(city === "") {
    alert("Input is empty");
    return;
  }

  getWeather(city);
}

let getWeather = async (city) => {
  showLoader();  
  
  try{
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ed570ac911dad2a255e2965a53ced74&units=metric`);
      let data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      document.getElementById("city").innerText = data.name;
      document.getElementById("temp").innerText = data.main.temp + "°C";
      document.getElementById("condition").innerText = data.weather[0].description;
      document.getElementById("feels").innerText = data.main.feels_like + " °C"; 
      document.getElementById("humidity").innerText = data.main.humidity + " %";
      document.getElementById("wind").innerText = data.wind.speed + " km/h";
      document.getElementById("pressure").innerText = data.main.pressure + " hPa";

      document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    changeVideo(data.weather[0].main);
  }
  catch(error){
    alert("Error: "+error.message);
  }
  finally{
    hideLoader();
  }
};



const changeVideo = (condition) => {
  let videoSrc = "";

  if (condition === "Clear") {
    videoSrc = "videos/sunny.mp4";
  }

  else if (
    condition === "Clouds" ||
    condition === "Mist" ||
    condition === "Fog" ||
    condition === "Haze" ||
    condition === "Smoke"
  ) {
    videoSrc = "videos/cloudy.mp4";
  }

  else if (
    condition === "Rain" ||
    condition === "Drizzle" ||
    condition === "Thunderstorm"
  ) {
    videoSrc = "videos/rain.mp4";
  }

  else if (condition === "Snow") {
    videoSrc = "videos/snow.mp4";
  }

  else {
    videoSrc = "videos/default.mp4";
  }

  video.src = videoSrc;
};

getWeather("Mumbai");