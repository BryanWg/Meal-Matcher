import {
    Box,
    Button,
    Center,
    Container,
    Divider,
    Flex,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
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
                setResDetails(data.data());
                onOpen();
            })
            .catch((error) =>
                toast({
                    title: error,
                    status: 'error',
                    isClosable: true
                })
            );
    };
    const onHoverColor = useColorModeValue('pink.100', 'purple.900');
    const bgColor = useColorModeValue('white', 'gray.800');
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
                                    bg={
                                        res.place_id === resDetails?.place_id
                                            ? onHoverColor
                                            : bgColor
                                    }
                                    rounded="lg"
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
                // <Modal isOpen={isOpen} onClose={onClose}>
                <Center
                    w="50%"
                    display={{
                        base: 'none',
                        md: 'inline-flex'
                    }}

                    // position={{
                    //     sm: 'fixed'
                    // }}
                >
                    {resDetails ? (
                        <CardDetails {...resDetails} />
                    ) : (
                        <Text fontSize="xl">
                            Pick Restaurant to be displayed
                        </Text>
                    )}
                </Center>
                // </Modal>
            )}

            <Modal isOpen={isOpen} onClose={onClose} size="md">
                <ModalContent
                    visibility={{ base: 'visible', md: 'hidden' }}
                    bg={useColorModeValue('#FAFAFA', 'gray.700')}
                >
                    <ModalCloseButton />
                    <Center>
                        <CardDetails {...resDetails} isModel />
                    </Center>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
