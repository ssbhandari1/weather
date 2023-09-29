import axios from "axios";

const Api_key = '455ff47fe5f927f8c020199405102b78';
const Base_url = 'https://api.openweathermap.org/data/2.5/';

const fetchWeatherApiData = async (city, units) => {
  const api = `${Base_url}/weather?q=${city}&appid=${Api_key}&units=${units}`;

  try {
    const res = await axios.get(api);

    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = res.data;
    const { description, icon } = weather[0];
    return {
      description,
      iconURL: icon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    };
  } catch (error) {
    throw error;
  }
};

// current location
const fetchCurrentLocation = (units) => {
  return new Promise((resolve, reject) => {
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const api = `${Base_url}/weather?lat=${latitude}&lon=${longitude}&appid=${Api_key}&units=${units}`;
          try {
            const res = await axios.get(api);
            const data = parseWeatherData(res.data);
            resolve(data);
          } catch (error) {
            reject(error); 
          }
        });
      } else {
        throw new Error("Geolocation is not available in this browser.");
      }
    } catch (error) {
      reject(error); 
    }
  });
};




const parseWeatherData = async(data) => {
  try {
    
    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = data;
    const { description, icon } = weather[0];
  console.log(name)
    return {
      description,
      iconURL: icon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    };
  } catch (error) {
    console.log(error,'hell')
  }
 
 
};

export { fetchWeatherApiData, fetchCurrentLocation };
