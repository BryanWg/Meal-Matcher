import { Box, Image, useColorModeValue } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import CardDetails from '../Interfaces/cardDetails';

const Card = (props: any) => {
    console.log(props);
    const onSwipe = (direction: string) => {
        console.log('You swiped: ' + direction);
    };

    const onCardLeftScreen = (myIdentifier: string) => {
        console.log(myIdentifier + ' left the screen');
    };
    const key = 'AIzaSyCYSVPtRpCwr32epWWbWvtfMttFOXw2lMY';
    return (
        <Box position="absolute">
            <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen('fooBar')}
                preventSwipe={['up', 'down']}
            >
                <Box
                    bg={useColorModeValue('white', 'gray.700')}
                    w="500px"
                    h="700px"
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
                            boxSize="500px"
                            alt="Segun Adebayo"
                            fit="cover"
                        />
                    ))}

                    {props.name}
                </Box>
            </TinderCard>
        </Box>
    );
};

export default Card;
