import React from 'react';
import logo from './logo.svg';
import './App.css';
import TinderCard from 'react-tinder-card'
import Card from './Pages/main';
import { Box, Flex } from '@chakra-ui/react';
import GetRestaurant from './functions';

function App() {
  GetRestaurant().then(data => console.log(data))//.catch(error => console.log(error)); 
   
  return (
    <Flex align="center" justifyContent="center" justifyItems="center">
      <Box  width="90vw" maxW="500px" h="300px"> 
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
