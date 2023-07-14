import './App.css';
import { Box,} from '@chakra-ui/react';
import Main from './components/Main';
import { useContext, useEffect, useRef } from 'react';
import { WeatherContext } from './context/WeatherContext';

function App() {
  const videoRef = useRef()
  const {timeOfDay} = useContext(WeatherContext)

  useEffect(() => {
    if(!timeOfDay) return
    videoRef.current?.load()
  },[timeOfDay])

  return (
    <Box >
      <video ref={videoRef} autoPlay playsInline muted loop id="bgVideo">
            <source src={`/${timeOfDay}.mp4`} type="video/mp4"/>
      </video> 
      <Main/>
    </Box>
  );
}

export default App;
