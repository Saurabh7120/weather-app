import {  Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import  {RiTempHotLine}  from 'react-icons/ri';

const Tiles = ({title,icon,value,unit}) => {
    return (
        <VStack className='glassBg' px={3} py={3} w={'8.5rem'} height={'8.5rem'} justifyContent={'space-between'} alignItems={'flex-start'}>
            <Icon fontSize={'xl'} as={icon}/>
            <div>
                <Text fontSize={'sm'}>{title}</Text>
                <Text lineHeight={'1.5rem'} fontWeight={'semibold'} fontSize={'2xl'}>{value}{unit}</Text>
            </div>
        </VStack>
    );
};

export default Tiles;