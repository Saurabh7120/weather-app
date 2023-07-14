import { HStack, Text } from '@chakra-ui/react';
import { format, parse } from 'date-fns';
import React, { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';

const SingleHour = ({data}) => {
    const {unit} = useContext(WeatherContext)
    return (
        <HStack justifyContent={'space-evenly'} w={'100%'}>
            <Text w={'33%'}>{format(parse('', '', new Date(data.time)), "h:mm a")}</Text>
            <HStack justifyContent={'space-between'}  w={'40%'}>
                <Text isTruncated>{data.condition.text}</Text>
                <img style={{width:'1.5rem', height:'1.5rem'}} src={data.condition.icon} alt="icon"/>
            </HStack>

            <Text w={'27%'} textAlign={'right'}>{data[`temp_${unit}`]}°</Text>
        </HStack>
    );
};

export default SingleHour;