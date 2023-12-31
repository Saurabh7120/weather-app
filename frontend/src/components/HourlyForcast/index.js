import { Box, Text, VStack } from '@chakra-ui/react';
import { format, parse } from 'date-fns';
import React, { useEffect } from 'react';
import SingleHour from './SingleHour';

const HourlyForcast = ({data}) => {
    const [hourlyData, setHourlyData] = React.useState([])

    useEffect(() => {
        if(!data) return
        //find which entry is for today in data.forecastday and get its hourly data
        const today = data.forecastday.find(i => `${format(parse('', '', new Date(i.date)), "EE, MMM d")}` === `${format(new Date(), "EE, MMM d")}`)
        setHourlyData(today.hour)
    },[data])

    return (
        <Box height={'20rem'} className='glassBg'  overflow={'hidden'}>
            <Text w={'100%'} textAlign={'left'} p={2} fontWeight={'semibold'}>Hourly Forecast</Text>
            <VStack p={2} gap={4} height={'20rem'}  overflowY={'scroll'}>
                {hourlyData.map((i,idx) => <SingleHour key={idx} data={i}/>)}
            </VStack>
        </Box>

    );
};

export default HourlyForcast;