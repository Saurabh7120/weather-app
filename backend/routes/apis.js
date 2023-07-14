const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get("/getWeatherByCity", async (req, res) => {
    try {
        const {city,lat,long} = req.query;

        let query="";
        if(city) {
            query = city
        }else if(lat && long){
            query = `${lat},${long}`
        }else{
          return res.status(400)
        }

        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
            params: {
              q: query,
              days: '3'
            },
            headers: {
              'X-RapidAPI-Key': process.env.API_KEY,
              'X-RapidAPI-Host': process.env.API_HOST
            }
        };

        const weather = await axios.request(options)
        res.json(weather.data);
    } catch (e) {
        // console.log(e)
        res.status(404).json({ error: e });
    }
})

module.exports = router;