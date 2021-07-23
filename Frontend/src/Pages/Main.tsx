import Card from '../Component/Card';
import { Box, Flex, CircularProgress, Center, useColorModeValue } from '@chakra-ui/react';
import GetRestaurant from '../functions';
import { useState, useEffect } from 'react';
import { mock } from '../mock'

export default function Main() {
    const [restaurants, setRestaurants] = useState<any[] | null>(mock);
    // const [restaurants, setRestaurants] = useState<any[] | null>(null);
    const [curLocation, setCurLocation] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            // setCurLocation(location);
            // console.log(location);
            // GetRestaurant({
            //     latitude: location.coords.latitude,
            //     longitude: location.coords.longitude,
            //     radius: 1500
            // })
            //     .then((data) => setRestaurants(data.data))
            //     .catch((error) => console.log(error));
            console.log('-----> in geolocation')
        });
        console.log('---> in useEffect')
    }, []);

    console.log(restaurants);

    return (
        <Flex align="center" alignItems="center" justifyContent="center" justifyItems="center" h="80vh">
            <Center width="90%" maxW="500px" h="100%" alignItems="center">
                {restaurants ? restaurants?.map((restaurant, idx) => (
                    <Card {...restaurant} idx={idx} key={restaurant.place_id} />
                )) : <CircularProgress isIndeterminate color='purple.500' />}
            </Center>
        </Flex>
    );
}
