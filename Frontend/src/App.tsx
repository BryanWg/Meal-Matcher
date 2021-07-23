import React from 'react';
import logo from './logo.svg';
import {
    BrowserRouter as Router,
    Route,
    Switch as RouteSwitch,
    Redirect
} from 'react-router-dom';
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import PrimaryLayout from './Component/Navbar';
import Main from './Pages/Main';
import ape from './Icons/ape.gif';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebaseInit from './firebaseInit'

firebaseInit();

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
    const [user] = useAuthState(auth);
    return <>{user ? <MainPage /> : <SignIn />}</>;
}

const MainPage = () => {
    return (
        <Router>
            <PrimaryLayout>
                <RouteSwitch>
                    <Route exact path={'/'} component={Main} />
                    <Route component={PageNotFound} />
                </RouteSwitch>
            </PrimaryLayout>
        </Router>
    );
};

const SignIn = () => {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                        <GoogleButton />
                        <FacebookButton />
                </Box>
            </Stack>
        </Flex>
    );
};

const PageNotFound = () => {
    return (
        <Flex
            flexDir="column"
            alignItems="center"
            justifyItems="center"
            justifyContent="center"
        >
            <Text fontSize="5xl">Page not found!!</Text>
            <Image src={ape} />
        </Flex>
    );
};

const GoogleButton = () => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <Center p={8}>
            <Button
                w={'full'}
                maxW={'md'}
                colorScheme={'messenger'}
                leftIcon={<FcGoogle />}
                onClick={signInWithGoogle}
            >
                <Center>
                    <Text>Sign in with Google</Text>
                </Center>
            </Button>
        </Center>
    );
};

const FacebookButton = () => {
    return (
        <Center p={8}>
            <Button
                w={'full'}
                maxW={'md'}
                colorScheme={'facebook'}
                leftIcon={<FaFacebook />}
            >
                <Center>
                    <Text>Continue with Facebook</Text>
                </Center>
            </Button>
        </Center>
    );
};
export default App;
