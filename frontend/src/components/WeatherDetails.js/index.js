import { HStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import  {RiTempHotLine}  from 'react-icons/ri';
import { FiWind } from 'react-icons/fi';
import { BsDropletHalf, BsSun } from 'react-icons/bs';
import { TbSunrise, TbSunset } from 'react-icons/tb';
import Tiles from '../utils/Tiles';
import { format, parse } from 'date-fns';
import { WeatherContext } from '../../context/WeatherContext';

const WeatherDetails = ({data}) => {

    const [astroData, setAstroData] = useState({})
    const {calculateTimeOfDay, unit} = useContext(WeatherContext)

    useEffect(() => {
        if(!data) return
        const today = data.forecast.forecastday.find(i => `${format(parse('', '', new Date(i.date)), "EE, MMM d")}` === `${format(parse('', '', new Date()), "EE, MMM d")}`)
        calculateTimeOfDay(today.astro.sunrise, today.astro.sunset, data.location.localtime)
        setAstroData({...data.current,...today.astro})
    },[data, unit])

    const details = {
        [`feelslike_${unit}`]:{
            title: 'Feels Like',
            icon: RiTempHotLine,
            unit: unit === 'f' ? '°F' : '°C'
        },
        wind_mph: {
            title: 'Wind',
            icon: FiWind,
            unit: 'mph'
        },
        humidity: {
            title: 'Humidity',
            icon: BsDropletHalf,
            unit: '%'
        },
        uv:{
            title: 'UV Index',
            icon: BsSun,
            unit: ''
        },
        sunrise: {
            title: 'Sunrise',
            icon: TbSunrise
        },
        sunset: {
            title: 'Sunset',
            icon: TbSunset
        }
    }

    return (
        <HStack flexWrap={'wrap'} justifyContent={'center'} gap='2.5rem'>
            {Object.keys(astroData).map((key, i) => details[key] ? <Tiles key={i} {...details[key]}  value={astroData[key]}/> : <></>)}
        </HStack>
    );
};

export default WeatherDetails;