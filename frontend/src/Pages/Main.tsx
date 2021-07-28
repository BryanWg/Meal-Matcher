import Card from '../Component/Card';
import {
    Box,
    Flex,
    CircularProgress,
    Center,
    useColorModeValue,
    Text,
    Skeleton,
    SkeletonCircle,
    useToast
} from '@chakra-ui/react';
import { GetDetails, GetRestaurant } from '../functions';
import { useState, useEffect } from 'react';
import { mock } from '../mock';
import firebaseInit from '../firebaseInit';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebaseInit();
const firestore = firebase.firestore();

// Adds new Res to firestore
const initialiseRes = (restaurants) => {
    restaurants?.map(async (res) => {
        const resRef = firestore.doc(`restaurants/${res.place_id}`);
        const userDoc: any = await resRef.get();

        if (!userDoc.exists) {
            let resToAdd = {
                name: res.name,
                place_id: res.place_id,
                ...(res?.opening_hours?.open_now && {
                    opening_hours: res?.opening_hours?.open_now
                }),
                ...(res?.photos && { photos: res.photos }),
                ...(res?.price_level && { price_level: res?.price_level }),
                ...(res?.rating && { rating: res?.rating }),
                ...(res?.vicinity && { vicinity: res?.vicinity }),
                ...(res?.reviews && { reviews: res?.reviews })
            };
            resRef.set(resToAdd);
        }
    });
};

export default function Main() {
    const [fltedRes, setFltedRes] = useState<any[] | null>(null);
    const toast = useToast();
    // Filter restaurant that has been matched
    const filterLikedRes = async (data: any[]) => {
        const auth = firebase.auth();
        const userId = auth.currentUser.uid;
        const userRef = await firebase
            .firestore()
            .doc(`matched_restaurant/${userId}`)
            .get();
        const userLikedRes = userRef
            .data()
            ?.liked_restaurant?.map((res) => res.place_id);

        const filteredRes = data.filter((res) => !userLikedRes?.includes(res.place_id))

        if (filteredRes.length < 1) {
            setFltedRes([])
        } else {
            // Get restaurant details (primarily reviews) from api call or firestore if exist
            let reDetailPromises = filteredRes.map((res) => {
                return firestore.doc(`restaurants/${res.place_id}`).get().then((resDoc) => {
                    if (resDoc.exists) {
                        return resDoc.data()
                    } else {
                        return GetDetails(res.place_id)
                            .then((details) => {
                                return ({ ...res, ...details.data })
                            })
                    }
                })
            })

            Promise.all(reDetailPromises).then(results => {
                setFltedRes(results);
                initialiseRes(results)
            })
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((location) => {
            GetRestaurant({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                radius: 1500
            })
                .then((data) => {
                    filterLikedRes(data.data);
                })
                // .catch((error) => {
                //     console.log(error)
                //     console.log(error.response.data)
                // });
                .catch((error) => {
                    toast({
                        title: 'Error',
                        description: error.response.data,
                        status: 'error',
                        isClosable: true
                    })
                });
        });
    }, []);

    return (
        <Flex
            align="center"
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            h="80vh"
        >
            <Center width="90%" maxW="500px" h="100%" alignItems="center">
                {fltedRes ? (
                    <>
                        <Text fontSize="xl">That's all for now!</Text>
                        {fltedRes?.map((restaurant, idx) => (
                            <Card
                                {...restaurant}
                                idx={idx}
                                key={restaurant.place_id}
                            />
                        ))}
                    </>
                ) : (
                    <Skeleton boxSize="xl" startColor="pink.200" endColor="purple.200" />
                )}
            </Center>
        </Flex>
    );
}
