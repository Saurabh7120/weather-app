import axios from 'axios'

export const getWeatherByCity = async (data) => {
    const {city, lat,long} = data
    let res;
    if(city) {
         res = await axios(`https://weather-app-service-h8yu.onrender.com/getWeatherByCity?city=${city}}`)
    }else{
        res = await axios(`https://weather-app-service-h8yu.onrender.com/getWeatherByCity?lat=${lat}&long=${long}`)
    }
    return res.data
}