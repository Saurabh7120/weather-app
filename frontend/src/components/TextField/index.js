import { Input } from '@chakra-ui/input';
import React, { useContext, useRef } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { Box, InputGroup, InputRightElement, Switch, HStack } from '@chakra-ui/react';
import { WeatherContext } from '../../context/WeatherContext';

const TextField = ({handleLocation}) => {
    const inputRef = useRef();


    const handlePlacesChanged = () => {
        const data = inputRef.current.getPlaces();
        if(data) {
            const [place] = data;
            if(place) {
                //if a place is selected send the city name to handleLocation function which will call the api
                handleLocation({city: place.formatted_address})
            }
        }
    }

    const {unit, setUnit} = useContext(WeatherContext)
    return (
        <Box minW={'87%'} >
            <LoadScript
                //for loading scripts for places api
                googleMapsApiKey={process.env.REACT_APP_PLACES_KEY}
                libraries={['places']}
            >
                <StandaloneSearchBox
                    //search box for places api
                    onLoad={(ref) => inputRef.current = ref}
                    onPlacesChanged={handlePlacesChanged}
                >
                    <InputGroup size="lg" className='glassBg' borderRadius={'3xl'}>
                    <Input 
                        placeholder='Type "Mumbai"' 
                        size='lg'
                        color={'black'}
                        _placeholder={{color: 'black'}}
                        borderRadius={'3xl'}
                    />
                    <InputRightElement width='5.5rem' marginRight={'1rem'}>
                        {/* //switch for changing units */}
                        <HStack><span>°F</span> <Switch isChecked={unit === 'c'} onChange={e => unit === 'f' ? setUnit('c') : setUnit('f') } colorScheme='blue' /> <span>°C</span></HStack>
                    </InputRightElement>
                    </InputGroup>

                </StandaloneSearchBox>
            </LoadScript>
        </Box>


    );
};

export default TextField;