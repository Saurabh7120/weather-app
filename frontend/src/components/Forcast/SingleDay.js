import { HStack, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';

const SingleDay = ({data}) => {
    const {unit} = useContext(WeatherContext)
    const today = `${format(new Date(data.date), "EE, MMM d")}` === `${format(new Date(), "EE, MMM d")}`
    return (
        <HStack justifyContent={'space-evenly'} w={'100%'}>
            <Text w={'30%'}>{today ? "Today" : format(new Date(data.date), "EE, MMM d")}</Text>
            <HStack justifyContent={'space-between'}  w={'40%'}>
                <Text isTruncated>{data.day.condition.text}</Text>
                <img style={{width:'1.5rem', height:'1.5rem'}} src={data.day.condition.icon} alt="icon"/>
            </HStack>

            <Text w={'30%'} >{data.day[`maxtemp_${unit}`]}°/ {data.day[`mintemp_${unit}`]}°</Text>
        </HStack>
    );
};

export default SingleDay;