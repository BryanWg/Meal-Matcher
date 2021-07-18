import { Box } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import CardDetails from '../Interfaces/cardDetails'

const Card = ({ ...props }, data: CardDetails[]) => {

    const onSwipe = (direction: string) => {
        console.log('You swiped: ' + direction)
    }

    const onCardLeftScreen = (myIdentifier: string) => {
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <Box className="swipe" borderRadius="lg" bg="tomato" >
            <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']} >
                <Box bg="tomato" w="500px" h="700px" p={4} borderRadius="md" color="white">
                    This is the hi
                </Box>
            </TinderCard>
        </Box>

    )
}

export default Card;