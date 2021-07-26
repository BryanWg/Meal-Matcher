import { Button, Center, Container, Divider, Flex, HStack, Spacer, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import firebaseInit from '../firebaseInit';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebaseInit();
const firestore = firebase.firestore();
export default function Matches() {
    const [matchedRes, setMatchedRes] = useState<any[] | null>(null)
    const auth = firebase.auth();
    const userId = auth.currentUser.uid;
    firebase.firestore().doc(`matched_restaurant/${userId}`).get().then((res) => {
        setMatchedRes(res.data().liked_restaurant)
    });


    return (
        <Flex>
            <Table w="50%">
                <Thead>
                    <Tr>
                        <Th>
                            <HStack>
                                <Text>Restaurant</Text>
                                <Spacer/>
                                <Button>Random</Button>
                            </HStack>
                            
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {matchedRes ?
                        matchedRes.map((res) =>
                            <Tr _hover={{bg:'red.100', cursor:'pointer'}}>
                                <Td>{res.name}</Td>

                            </Tr>
                        ) :
                        <Text>No Liked Restaurant</Text>}
                </Tbody>
            </Table>
            <Center>
                <Divider orientation="vertical" />
            </Center>
            <Container w="50%">
                sd
            </Container>
        </Flex>
    )
}