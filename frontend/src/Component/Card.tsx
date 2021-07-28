import {
    Box,
    Center,
    Flex,
    Text,
    Image,
    useColorModeValue,
    Heading,
    HStack,
    Icon,
    Spacer,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    CloseButton,
    Accordion,
    AccordionItem,
    AccordionButton,
    Avatar,
    Tag,
    AccordionIcon,
    AccordionPanel
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import firebaseInit from '../firebaseInit';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsClockFill } from 'react-icons/bs';
import ape from '../Icons/ape.gif';

firebaseInit();
const auth = firebase.auth();
const firestore = firebase.firestore();

const Card = (props: any) => {
    //console.log(props);
    const matchedRes = firestore.collection('matched_restaurant');
    // const query = matchedRes.limit(2);
    // const [restaurants] = useCollectionData(query, {idField: 'id'})
    // console.log(restaurants)

    const { uid, photoURL } = auth.currentUser;
    const toast = useToast();
    const toastColor = useColorModeValue('pink.700', 'purple.300');
    const onSwipe = (direction: string) => {
        console.log('You swiped: ' + direction);
        if (direction === 'right') {
            firestore
                .collection('matched_restaurant')
                .doc(auth.currentUser.uid)
                .update({
                    liked_restaurant: firebase.firestore.FieldValue.arrayUnion({
                        place_id: props.place_id,
                        name: props.name
                    })
                });
            console.log('place id', props.place_id);
            toast({
                title: "Match made in heaven 🍕",
                description: `${props.name} matched with you`,
                duration: 5000,
                isClosable: true,
                render: () => (
                    <Box rounded="lg" color="white" p={3} bg={toastColor}>
                        <Heading fontSize='lg'>Match made in heaven 🍕</Heading>
                        <Text>{`${props.name} matched with you`}</Text>
                    </Box>
                ),
            })
        }
    };

    const onCardLeftScreen = (myIdentifier: string) => {
        console.log(myIdentifier + ' left the screen');
    };

    return (
        <Center position="absolute">
            <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen('fooBar')}
                preventSwipe={['up', 'down']}
            >
                <CardDetails {...props} />
            </TinderCard>
        </Center>
    );
};

export const CardDetails = (props: any) => {
    return (
        <Flex
            flexDir="column"
            alignContent="flex-start"
            justifyItems="center"
            bg={useColorModeValue('#FAFAFA', 'gray.700')}
            w="90vw"
            h="80vh"
            maxW="500px"
            maxH="650px"
            mt="10px"
            p={4}
            borderWidth={props.isModal ? '0px' : '1px'}
            borderColor={useColorModeValue('grey.50', 'gray.800')}
            rounded="lg"
            color={useColorModeValue('gray.900', 'gray.50')}
            overflowY="auto"
            shadow="sm"
        >
            <Tabs isFitted isManual>
                <TabList mb="0.5em">
                    <Tab>Overview</Tab>
                    <Tab>Review</Tab>
                    <Tab>Menu</Tab>
                    {props.onCloseCallBack && (
                        <CloseButton onClick={props.onCloseCallBack} />
                    )}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Overview {...props} />
                    </TabPanel>
                    <TabPanel>
                        {props.reviews ?
                            <Reviews {...props} /> :
                            <Text>No reviews 😑</Text>}
                    </TabPanel>
                    <TabPanel>
                        <Menu {...props} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
};
const Overview = (props: any) => {
    const starColor = useColorModeValue('yellow.500', 'yellow.400');
    const addyColor = useColorModeValue('red.500', 'red.400');
    const priceLevelColor = useColorModeValue('green.500', 'green.400');
    const ClockColor = useColorModeValue('blue.500', 'blue.400');
    const key = process.env.REACT_APP_GOOGLE_API_KEY;
    return (
        <Box>
            {props.photos ? (
                props.photos?.map((photo) => (
                    <Image
                        borderRadius="lg"
                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=${key}&photoreference=${photo.photo_reference}`}
                        // src={ape}
                        w="100%"
                        h="80%"
                        maxH='350px'
                        maxW="500px"
                        key={photo.photo_reference}
                        alt="Restaurant picture"
                        fit="cover"
                        fallbackSrc="https://via.placeholder.com/150"
                    />
                ))
            ) : (
                <Image
                    borderRadius="lg"
                    src={ape}
                    w="100%"
                    h="80%"
                    maxH="500px"
                    maxW="500px"
                    alt="Picture holder"
                    fit="cover"
                />
            )}
            <Flex flexDir="column" my="5">
                <HStack align="flex-end">
                    <Heading size="lg" fontWeight="semibold">
                        {props.name}
                    </Heading>
                    {props.rating && (
                        <HStack spacing="0.5">
                            <Text
                                fontSize="lg"
                                fontWeight="semibold"
                            >
                                {props.rating}
                            </Text>
                            <Icon as={StarIcon} boxSize="3" color={starColor} />
                        </HStack>
                    )}
                </HStack>
                {props.vicinity && (
                    <HStack>
                        <Icon
                            as={FaMapMarkerAlt}
                            boxSize="3"
                            color={addyColor}
                        />
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${props.name.replace(
                                ' ',
                                '+'
                            )}&query_place_id=${props.place_id}`}
                            target="_blank"
                        >
                            <Text>{props.vicinity}</Text>
                        </a>
                        <Spacer />
                        {props.price_level && (
                            <HStack spacing="0">
                                {[...Array(props.price_level)].map((x, i) => (
                                    <Text key={i} color={priceLevelColor}>$</Text>
                                ))}
                            </HStack>
                        )}
                    </HStack>
                )}
                {props?.opening_hours?.open_now && (
                    <HStack>
                        <Icon as={BsClockFill} boxSize="3" color={ClockColor} />
                        {props?.opening_hours?.open_now ? (
                            <Text>Open now</Text>
                        ) : (
                            <Text>Closed</Text>
                        )}
                    </HStack>
                )}
            </Flex>
        </Box>
    );
};

const Reviews = (props: any) => {
    const starColor = useColorModeValue('yellow.500', 'yellow.400');

    return (
        <Accordion defaultIndex={[0]} allowMultiple>
            {props?.reviews?.map((review) =>
                <AccordionItem key={review.author_name}>
                    <AccordionButton>
                        <HStack w="100%">
                            <Avatar size={'sm'} src={review.profile_photo_url} />
                            <Text>{review.author_name}</Text>
                            <HStack spacing="0.5">
                                <Text>{review.rating} </Text>
                                <Icon as={StarIcon} boxSize="3" color={starColor} />
                            </HStack>
                            <Tag size="sm">{review.relative_time_description}</Tag>
                            <Spacer />
                            <AccordionIcon />
                        </HStack>
                    </AccordionButton>
                    <AccordionPanel>
                        <Text>
                            {review.text}
                        </Text>
                    </AccordionPanel>
                </AccordionItem>)}
        </Accordion>
    );
};

const Menu = (props: any) => {
    return (
        <Center>
            <Text>
                Future implementation by populating with uber eat menu's api
            </Text>
        </Center>
    );
};
export default Card;
