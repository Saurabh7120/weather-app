import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { format } from 'date-fns';
import { WeatherContext } from '../../context/WeatherContext';

const CurrentWeather = ({data,location}) => {

    const {unit} = useContext(WeatherContext)
    
    return (
        <VStack alignItems={'center'} w={'fit-content'} p={4} className='glassBg'>
            <HStack gap={'1rem'}>
                <VStack alignItems={'flex-start'} gap={'1px'}>
                    <Text lineHeight={'3rem'} fontWeight={'bold'} display={'flex'} fontSize={'5xl'} >{`${data[`temp_${unit}`]}°`}<img style={{width:'2rem', height:'2rem'}} src={data.condition.icon} alt="icon"/></Text>
                    <Text >{data.condition.text}</Text>
                </VStack>

                <Divider orientation='vertical' bg={'black'} h={'2.8rem'} w={'2px'}/>
                <VStack alignItems={'flex-start'} gap={'1px'}>
                    <Text as={'h2'} fontWeight={'bold'} fontSize={'xl'} >{format(new Date(location.localtime), "EE, MMM d")}</Text>
                    <Text as={'h2'} fontWeight={'bold'} fontSize={'xl'} >{format(new Date(location.localtime), "h:mm a")}</Text>
                </VStack>
            </HStack>
            <Text as={'h2'} fontWeight={'bold'} fontSize={'2xl'} >{`${location.name}, ${location.region}`}</Text>
        </VStack>
    );
};

export default CurrentWeather;