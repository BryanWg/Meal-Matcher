import { Box, Center, Flex, Text, Image, useColorModeValue } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import CardDetails from '../Interfaces/cardDetails';

const Card = (props: any) => {
    //console.log(props);
    const onSwipe = (direction: string) => {
        console.log('You swiped: ' + direction);
    };

    const onCardLeftScreen = (myIdentifier: string) => {
        console.log(myIdentifier + ' left the screen');
    };
    const key = 'AIzaSyCYSVPtRpCwr32epWWbWvtfMttFOXw2lMY';
    return (
        <Center position="absolute" >
            <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen('fooBar')}
                preventSwipe={['up', 'down']}
            >
                <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyItems="center"
                    bg={useColorModeValue('white', 'gray.700')}
                    w="90vw"
                    h="80vh"
                    maxW='500px'
                    maxH="700px"
                    mt="10px"
                    p={4}
                    borderWidth="1px"
                    borderColor={useColorModeValue('grey.50', 'gray.800')}
                    rounded="lg"
                    color={useColorModeValue('gray.900', 'gray.50')}
                    shadow="sm"
                >
                    {props.photos?.map((photo) => (
                        <Image
                            borderRadius="lg"
                            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=${key}&photoreference=${photo.photo_reference}`}
                            w="100%"
                            h="70%"
                            maxH="500px"
                            maxW="500px"
                            alt="Segun Adebayo"
                            fit="cover"
                        />
                    ))}
                    <Flex flexDir="column">
                        <Text>{props.name}</Text>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quia enim dicta officia! Quia doloremque ea totam quod voluptatum temporibus impedit exercitationem ut possimus, modi ducimus distinctio consequatur quam vero?
                    </Flex>
                </Flex>
            </TinderCard>
        </Center>
    );
};

export default Card;
