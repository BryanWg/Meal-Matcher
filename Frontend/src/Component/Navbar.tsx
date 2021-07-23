import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    Icon,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Text,
    useColorMode
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    AddIcon,
    MoonIcon,
    SunIcon
} from '@chakra-ui/icons';
import { ReactComponent as TinderEatsIcon } from '../Icons/tinderEats.svg';
import { Link as RouteLink } from 'react-router-dom';
import {GoSignOut} from 'react-icons/go'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseInit from '../firebaseInit';

firebaseInit();
const auth = firebase.auth();

const Links = [
    { label: 'Find a Bite!', link: '/' },
    { label: 'Settings', link: '/Settings' }
];

const NavLink = ({ children }: { children: {label: string, link: string} }) => (
    <Link
        as={RouteLink}
        to={children.link}
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700')
        }}
        href={'#'}
    >
        {children.label}
    </Link>
);

export default function PrimaryLayout(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <HStack>
                            <Icon as={TinderEatsIcon} boxSize="10" />
                            <Text
                                color={useColorModeValue('black', 'gray.300')}
                                fontWeight="medium"
                            >
                                Tinder Eats
                            </Text>
                        </HStack>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            {Links.map((link) => (
                                <NavLink key={link.label}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <ColorThemeButton />
                        <Button
                            variant={'solid'}
                            colorScheme={'pink'}
                            size={'sm'}
                            mx={2}
                            rightIcon={<GoSignOut />}
                            onClick={() => auth.signOut()}
                        >
                            Sign out
                        </Button>

                        <Avatar size={'sm'} src={auth.currentUser.photoURL} />
                        
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.label}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
            <Box p={4}>{props.children}</Box>
        </>
    );
}

const ColorThemeButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton
            size={'sm'}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            aria-label={'Open Menu'}
            onClick={toggleColorMode}
        />
    );
};
