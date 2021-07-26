import Card from '../Component/Card';
import { Box, Flex, CircularProgress, Center, useColorModeValue, Text } from '@chakra-ui/react';
import GetRestaurant from '../functions';
import { useState, useEffect } from 'react';
import { mock } from '../mock'
import firebaseInit from '../firebaseInit';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebaseInit();
const firestore = firebase.firestore();

const initialiseRes = (restaurants) => {
    restaurants?.map( async res => {
        const resRef = firestore.doc(`restaurants/${res.place_id}`)
        const userDoc: any = await resRef.get();

        if (!userDoc.exists) {
            let resToAdd = {
                name: res.name,
                place_id: res.place_id, 
                ...(res?.opening_hours?.open_now && {opening_hours: res?.opening_hours?.open_now}),
                ...(res?.photos?.photo_reference &&{photo_ref: res?.photos?.photo_reference}),
                ...(res?.price_level && {price_level: res?.price_level}),
                ...(res?.rating && {rating: res?.rating}),
                ...(res?.vicinity && {vicinity: res?.vicinity})
            }
            resRef.set(resToAdd)
        }
    }) 
}

export default function Main() {
    const [fltedRes, setFltedRes] = useState<any[] | null>(null);
    const [restaurant, setRestaurants] = useState<any[] | null>(null);

    const filterLikedRes = async (data: any[]) => {
        const auth = firebase.auth();
        const userId = auth.currentUser.uid;
        const userRef = await firebase.firestore().doc(`matched_restaurant/${userId}`).get();
        const userLikedRes = userRef.data().liked_restaurant.place_id;
        console.log('-->', userLikedRes)
        setFltedRes(data.filter((res) => !userLikedRes?.includes(res.place_id)))
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            // console.log(location);
            // GetRestaurant({
            //     latitude: location.coords.latitude,
            //     longitude: location.coords.longitude,
            //     radius: 1500
            // })
            //     .then((data) => {
            // setRestaurants(data.data)
            // setFltedRes(filterLikedRes(data.data))
            // })
            //     .catch((error) => console.log(error));
            console.log("==>", filterLikedRes(mock))
            setRestaurants(mock)
        });
    }, []);

    useEffect(()=> {
        initialiseRes(fltedRes);
    }, [restaurant])

    console.log(fltedRes);

    return (
        <Flex align="center" alignItems="center" justifyContent="center" justifyItems="center" h="80vh">
            <Center width="90%" maxW="500px" h="100%" alignItems="center">
                {fltedRes ?
                    <>
                        <Text fontSize="xl">That's all for now!</Text>
                        {fltedRes?.map((restaurant, idx) => (
                            <Card {...restaurant} idx={idx} key={restaurant.place_id} />))}
                    </> : <CircularProgress isIndeterminate color='purple.500' />}
            </Center>
        </Flex>
    );
}


