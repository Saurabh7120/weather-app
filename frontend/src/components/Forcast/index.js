import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SingleDay from './SingleDay';

const Forcast = ({data}) => {
    return (
        <Box height={'20rem'} className='glassBg'>
            <Text w={'100%'} textAlign={'left'} p={2} fontWeight={'semibold'}>3 Day Forecast</Text>
            <VStack p={2} gap={4} height={'20rem'}>
                {data.map((i,idx) => <SingleDay key={idx} data={i}/>)}
            </VStack>
        </Box>
    );
};

export default Forcast;