import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import { DateTime } from 'luxon';

const CurrentWeather = ({data,location}) => {
    const [date, setDate] = useState();

    const {unit} = useContext(WeatherContext)

    useEffect(() => {
        if(!location) return
        let time = location.localtime.split(" ")[1]
        let isSingle = time.split(":")[0].length === 1
        if(isSingle) {
            setDate(location.localtime.split(" ").join("T0") + ":00")
        }else{
            setDate(location.localtime.split(" ").join("T") + ":00")
        }
    },[location])

    return (
        <VStack alignItems={'center'} w={'fit-content'} p={4} className='glassBg'>
            <HStack gap={'1rem'}>
                <VStack alignItems={'flex-start'} gap={'1px'}>
                    <Text lineHeight={'3rem'} fontWeight={'bold'} display={'flex'} fontSize={'5xl'} >{`${data[`temp_${unit}`]}°`}<img style={{width:'2rem', height:'2rem'}} src={data.condition.icon} alt="icon"/></Text>
                    <Text >{data.condition.text}</Text>
                </VStack>

                <Divider orientation='vertical' bg={'black'} h={'2.8rem'} w={'2px'}/>
                <VStack alignItems={'flex-start'} gap={'1px'}>
                    <Text as={'h2'} fontWeight={'bold'} fontSize={'xl'} >{new Date(date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                    })}</Text>
                    <Text as={'h2'} fontWeight={'bold'} fontSize={'xl'} >{DateTime.fromISO(date).toLocaleString({ hour: 'numeric', minute: '2-digit' })}</Text>
                </VStack>
            </HStack>
            <Text as={'h2'} fontWeight={'bold'} fontSize={'2xl'} >{`${location.name}, ${location.region}`}</Text>
        </VStack>
    );
};

export default CurrentWeather;