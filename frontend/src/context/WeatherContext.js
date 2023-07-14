
import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

const WeatherContextProvider = ({children}) => {
    const [unit, setUnit] = useState('c')
    const [timeOfDay, setTimeOfDay] = useState()

    const convertTime = timeStr => {
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
            // console.log('night')
            setTimeOfDay('night')
        }else if(now > evening - 2) {
            // setTimeOfDay('sunset')
            setTimeOfDay('sunset')
        }else if(now > day) {
            // console.log('day')
            setTimeOfDay('day')
        }else{
            // console.log('sunrise')
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