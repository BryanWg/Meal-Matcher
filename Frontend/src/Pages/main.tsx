import { Box, Image  } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import CardDetails from '../Interfaces/cardDetails'

const Card: React.FC = (props: any) => {
    console.log(props)
    const onSwipe = (direction: string) => {
        console.log('You swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier: string) => {
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <Box position="absolute">
            <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']} >
                <Box bg="tomato" w="500px" h="700px" p={4} borderRadius="full" color="white">
                    <Image src="https://bit.ly/sage-adebayo" boxSize="500px" alt="Segun Adebayo" />
                    {props.name}
                </Box>
            </TinderCard>
        </Box>

    )
}

export default Card;