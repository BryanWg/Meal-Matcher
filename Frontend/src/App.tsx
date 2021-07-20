import React from 'react';
import logo from './logo.svg';
import './App.css';
import TinderCard from 'react-tinder-card'
import Card from './Pages/main';
import { Box, Flex } from '@chakra-ui/react';
import GetRestaurant from './functions';
import axios from 'axios';
import { stringify } from 'flatted';

function App() {
  GetRestaurant().then(data => console.log(data))//.catch(error => console.log(error)); 
  axios.get(
    'http://localhost:5000/restaurants'
  )
    .then(restaurants => console.log(stringify(restaurants)))
    .catch(err => console.log('Error: ' + err));
  return (
    <Flex align="center" justifyContent="center" justifyItems="center">
      <Box width="90vw" maxW="500px" h="300px">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Box>

    </Flex>
  );
}

export default App;
