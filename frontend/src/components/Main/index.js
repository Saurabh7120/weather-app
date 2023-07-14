import { Box, Container, Progress, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TextField from '../TextField';
import { useMutation } from 'react-query';
import { getWeatherByCity } from '../../api/getWeatherByCity';
import CurrentWeather from '../CurrentWeather';
import WeatherDetails from '../WeatherDetails.js';
import Forcast from '../Forcast';
import HourlyForcast from '../HourlyForcast';

const Main = () => {
    const [forcast, setForcast] = useState(null)
    const [error, setError] = useState(null)

    const mutation = useMutation(getWeatherByCity, {
      onSuccess: (data) => {
        setForcast(data)
      },
      onError: (e) => {
        setError(e)
      }
    })

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
  };

  function success(pos) {
      //if access granted get the location and pass it to the mutation
      var crd = pos.coords;
      mutation.mutate({lat: crd.latitude, long: crd.longitude})
  }
  
  function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(() => {
      //get location permisson and take action based on the result
      if (navigator.geolocation) {
          navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
              if (result.state === "granted") {
                  navigator.geolocation.getCurrentPosition(success, errors, options);
                } else if (result.state === "prompt") {
                  navigator.geolocation.getCurrentPosition(success, errors, options);
                } else if (result.state === "denied") {
                  mutation.mutate({city: "Jersey City"})
                }
          });
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
  },[])

  
  
  

    return (
        <Container maxW={'container.xl'} display={'flex'} flexDirection={'column'} alignItems={"center"} py={'2rem'}>
            <TextField
            handleLocation={location => mutation.mutate(location)}
            />
            <br/>
            <br/>
            {(mutation.isLoading ) && <Progress size='xs' isIndeterminate />}
            {error && <Text>Oops! Something went wrong!</Text>}
            {(mutation.isSuccess && forcast && !error)  && 
            <>
                <CurrentWeather
                data={forcast?.current}
                location={forcast?.location}
                />
                <br/>
                <br/>
                <div>
                    <WeatherDetails data={forcast}/>
                    <br/>
                    <br/>
                    <Box w={'100%'} >
                        <SimpleGrid columns={{sm: 1, md: 2}} spacing={'1rem'}>
                            <HourlyForcast data={forcast?.forecast}/>
                            <Forcast data={forcast?.forecast.forecastday}/>
                        </SimpleGrid>
                    </Box>
                </div>

            </>}
      </Container>

    );
};

export default Main;