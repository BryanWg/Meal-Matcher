import Card from '../Component/Card';
import { Box, Flex, CircularProgress } from '@chakra-ui/react';
import GetRestaurant from '../functions';
import { useState, useEffect } from 'react';

export default function Main() {
    const [restaurants, setRestaurants] = useState<any[] | null>(null);
    const [curLocation, setCurLocation] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            setCurLocation(location);
            console.log(location);
            GetRestaurant({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                radius: 1500
            })
                .then((data) => setRestaurants(data.data))
                .catch((error) => console.log(error));
        });
    }, []);

    console.log(restaurants);

    return (
        <Flex align="center" justifyContent="center" justifyItems="center">
            <Box width="90vw" maxW="500px" h="300px">
                {restaurants ? restaurants?.map((restaurant) => (
                    <Card {...restaurant} key={restaurant.name} />
                )) : <CircularProgress isIndeterminate/>}
            </Box>
        </Flex>
    );
}
