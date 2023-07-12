const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get("/getWeatherByCity", async (req, res) => {
    try {
        console.log("called")
        const city = req.query.city;

        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
            params: {
              q: city,
              days: '3'
            },
            headers: {
              'X-RapidAPI-Key': 'cb50c4ee10mshb12a68cdf4843b8p1b54dfjsnbd76d3a890cf',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        const weather = await axios.request(options)
        console.log(weather.data)
        res.json(weather.data);
    } catch (e) {
        console.log(e)
        res.status(404).json({ error: e });
    }
})

module.exports = router;