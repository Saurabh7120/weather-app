import axios from 'axios'

export const getWeatherByCity = async (data) => {
    const {city, lat,long} = data
    let res;
    if(city) {
         res = await axios(`https://staging--unique-dolphin-1c8e27.netlify.app/.netlify/functions/api/getWeatherByCity?city=${city}}`)
    }else{
        res = await axios(`https://staging--unique-dolphin-1c8e27.netlify.app/.netlify/functions/api/getWeatherByCity?lat=${lat}&long=${long}`)
    }
    return res.data
}