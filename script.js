
const title = document.getElementById("title")
const searchBtn = document.getElementById("searchBtn")
const weatherInfoDiv = document.getElementById("weatherInfo")
const tryInput = document.getElementById("tryLatLon")
let lat
let lon

searchBtn.onclick = () => {
    if(navigator.geolocation){
        pos = navigator.geolocation.getCurrentPosition(getData)
    } else {
        alert("Geolocation not supported")
    }
}

const getData = async (position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    const dataInfo = {
        city: "",
        temp: 0,
        feels_like: 0,
        humidity: 0,
        wind_spd: 0,
        wind_dir: "",
        sunrise: "",
        sunset: ""
    }
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fe5981d6e0msh6c80a5643739d6cp119a22jsn9c0ee4a42b85',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    }
    const url = 'https://weatherbit-v1-mashape.p.rapidapi.com/current?lon='+lon+'&lat='+lat+'&units=imperial&lang=en'
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        dataInfo.temp = data.data[0].temp
        dataInfo.feels_like = data.data[0].app_temp
        dataInfo.humidity = data.data[0].rh
        dataInfo.wind_spd = data.data[0].wind_spd
        dataInfo.wind_dir = data.data[0].wind_cdir
        dataInfo.sunrise = data.data[0].sunrise
        dataInfo.sunset = data.data[0].sunset
        dataInfo.city = data.data[0].city_name
        printData(dataInfo)

    } catch (error){
        console.log(error)
        return
    }
}
function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        weatherInfoDiv.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        weatherInfoDiv.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        weatherInfoDiv.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        weatherInfoDiv.innerHTML = "An unknown error occurred."
        break;
    }
  }


const printData = (data) => {
    weatherInfoDiv.innerHTML = '<p><i class="fa-solid fa-temperature-half"></i> Temp: '+data.temp+'&#176;</p><br>'
        +'<p><i class="fa-solid fa-person-rays"></i> Feels like: '+data.feels_like+'&#176;</p><br>'
        +'<p><i class="fa-solid fa-droplet"></i> Humidity: '+data.humidity+'</p><br>'
        +'<p><i class="fa-solid fa-wind"></i> Wind speed: '+data.wind_spd+' mph</p><br>'
        +'<p><i class="fa-regular fa-compass"></i> Wind Direction: '+data.wind_dir+'</p><br>'
        +'<p><i class="fa-regular fa-sun"></i> Sunrise: '+data.sunrise+'</p><br>'
        +'<p><i class="fa-regular fa-moon"></i> Sunset: '+data.sunset+'</p><br>'
    searchBtn.style.display = "none"
    title.innerText = data.city
}

