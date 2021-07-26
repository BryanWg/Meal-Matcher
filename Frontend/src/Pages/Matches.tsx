import {
    Box,
    Button,
    Center,
    Container,
    Divider,
    Flex,
    HStack,
    Spacer,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import firebaseInit from '../firebaseInit';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { CardDetails } from '../Component/Card';

firebaseInit();
const firestore = firebase.firestore();
export default function Matches() {
    const [matchedRes, setMatchedRes] = useState<any[] | null>(null);
    const [resDetails, setResDetails] = useState<any | null>(null);
    const auth = firebase.auth();
    const userId = auth?.currentUser?.uid;
    const toast = useToast();
    firebase
        .firestore()
        .doc(`matched_restaurant/${userId}`)
        .get()
        .then((res) => {
            setMatchedRes(res.data().liked_restaurant);
        });

    const selectRes = (place_id) => {
        console.log('in select Res')
        const resRef = firestore.doc(`restaurants/${place_id}`);
        resRef
            .get()
            .then((data) => setResDetails(data.data()))
            .catch((error) =>
                toast({
                    title: error,
                    status: 'error',
                    isClosable: true
                })
            );
    };
    const onHoverColor = useColorModeValue('pink.100', 'purple.900');
    return (
        <Flex>
            <Box w="50%">
                {matchedRes ? (
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>
                                    <HStack>
                                        <Text>Restaurant</Text>
                                        <Spacer />
                                        <Button>Random</Button>
                                    </HStack>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {matchedRes.map((res) => (
                                <Tr
                                    _hover={{
                                        bg: onHoverColor,
                                        cursor: 'pointer'
                                    }}
                                    key={res.place_id}
                                    onClick={() => selectRes(res.place_id)}
                                >
                                    <Td>{res.name}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                ) : (
                    <Text>No Liked Restaurant</Text>
                )}
            </Box>

            <Center h="100%">
                <Divider orientation="vertical" />
            </Center>
            <Center w="50%">
                {resDetails && <CardDetails {...resDetails} />}
            </Center>
        </Flex>
    );
}
