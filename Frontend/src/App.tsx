import React from 'react';
import logo from './logo.svg';
import './App.css';
import TinderCard from 'react-tinder-card'
import Card from './Pages/main';
import { Box, Flex } from '@chakra-ui/react';
import GetRestaurant from './functions';
import axios from 'axios';
import { stringify, parse } from 'flatted';
import { useState, useEffect } from 'react';

function App() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [curLocation, setCurLocation] = useState({});
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setCurLocation(location)
      console.log(location)
      GetRestaurant({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        radius: 1500
      })
        .then(data => setRestaurants(data.data))
        .catch(error => console.log(error));
    })
    
  }, [])

  console.log(restaurants);

  return (
    <Flex align="center" justifyContent="center" justifyItems="center">
      <Box width="90vw" maxW="500px" h="300px">
        {restaurants.map(restaurant => <Card {...restaurant} key={restaurant.name}/>)}
      </Box>

    </Flex>
  );
}

export default App;
