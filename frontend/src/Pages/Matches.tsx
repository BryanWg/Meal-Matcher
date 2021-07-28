import {
    Box,
    Button,
    Center,
    Container,
    Divider,
    Flex,
    HStack,
    Modal,
    ModalCloseButton,
    ModalContent,
    Spacer,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [matchedRes, setMatchedRes] = useState<any[] | null>(null);
    const [resDetails, setResDetails] = useState<any | null>(null);
    const onHoverColor = useColorModeValue('pink.100', 'purple.900');
    const bgColor = useColorModeValue('#FAFAFA', 'gray.800');

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
        console.log('in select Res');
        const resRef = firestore.doc(`restaurants/${place_id}`);
        resRef
            .get()
            .then((data) => {
                setResDetails(data.data())
                onOpen()
            })
            .catch((error) =>
                toast({
                    title: error,
                    status: 'error',
                    isClosable: true
                })
            );
    };

    const randomOnClick = () => {
        if (matchedRes?.length > 0) {
            selectRes(matchedRes[Math.floor(Math.random() * matchedRes.length)].place_id)
        } else {
            toast({
                title: 'Error',
                description: 'No matched restaurants',
                status: 'error',
                isClosable: true,
            })
        }
    }

    return (
        <Flex display={{ base: 'block', md: 'flex' }}>
            <Box w={{ base: '100%', md: '50%' }}>
                {matchedRes ? (
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>
                                    <HStack>
                                        <Text>Restaurant</Text>
                                        <Spacer />
                                        <Button onClick={randomOnClick}>Random</Button>
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
                                    bg={
                                        res.place_id === resDetails?.place_id
                                            ? onHoverColor
                                            : bgColor
                                    }
                                >
                                    <Td>{res.name}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                ) : (
                    <Text fontSize="xl">No Liked Restaurant</Text>
                )}
            </Box>

            {matchedRes && (
                <Center w="50%" display={{ base: 'none', md: 'inline-flex' }}>
                    {resDetails ? (
                        <CardDetails {...resDetails} />
                    ) : (
                        <Text fontSize="xl">
                            Pick Restaurant to be displayed
                        </Text>
                    )}
                </Center>
            )}
            {matchedRes && (
                <Modal isOpen={isOpen} onClose={onClose} size='lg'>
                    <ModalContent visibility={{ base: 'visible', md: 'hidden' }}>
                        <ModalCloseButton />
                        <CardDetails {...resDetails} isModal />
                    </ModalContent>
                </Modal>

            )}
        </Flex>
    );
}
