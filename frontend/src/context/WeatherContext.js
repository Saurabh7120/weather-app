
import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

const WeatherContextProvider = ({children}) => {
    const [unit, setUnit] = useState('f')
    const [timeOfDay, setTimeOfDay] = useState()

    const convertTime = timeStr => {
        //function to get hours number from time string
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
           hours = '00';
        }
        if (modifier === 'PM') {
           hours = parseInt(hours, 10) + 12;
        }else if(hours.split('')[0] === '0') {
            hours = hours.split('')[1]
        }
        return parseInt(hours);
     };

    const calculateTimeOfDay = (sunrise, sunset, current) => {
        let day = convertTime(sunrise) + 1
        let evening = convertTime(sunset)
        let now = new Date(current).getHours()
        if(now > evening) {
            //if time is past sunset set time of day to night
            setTimeOfDay('night')
        }else if(now > evening - 2) {
            //if time is past 2 hours before sunset set time of day to evening
            setTimeOfDay('sunset')
        }else if(now > day) {
            //if time is past sunrise set time of day to day
            setTimeOfDay('day')
        }else{
            //if time is past 2 hours before sunrise set time of day to sunrise
            setTimeOfDay('sunrise')
        }
    }

    return (
        <WeatherContext.Provider value={{calculateTimeOfDay, unit, setUnit, timeOfDay}}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherContextProvider;