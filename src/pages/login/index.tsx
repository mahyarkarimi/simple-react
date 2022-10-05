import React, { useState } from "react";
import { Input, Box, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { useAuth } from "../../context/AuthContext";
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
const Login: React.FC = ({

}) => {
    const auth = useAuth();
    const toast = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        setLoading(true)
        auth.signin(username, password).catch(console.error).then(v => {
            if (!v) {
                toast({
                    title: 'Incorrect password',
                    description: "Please enter any username with password `admin` to login.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Logged in',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                navigate('/')
            }
        }).finally(() => setLoading(false));

    }
    if (auth.isAuthenticated) {
        <Box display='flex' flexDir='column' gap='4px' justifyContent='space-around' padding='16px' borderRadius='16px' shadow='base'>
            User {auth.user.username} logged in
        </Box>
    }
    return (
        <Box display='flex' flexDir='column' gap='4px' justifyContent='space-around' padding='16px' borderRadius='16px' shadow='base'>
            <FormControl isRequired>
                <FormLabel>Enter Username</FormLabel>
                <Input onChange={(e) => setUsername(e.target.value)} type='text' variant='filled' placeholder='Username' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Enter Password</FormLabel>
                <Input onChange={(e) => setPassword(e.target.value)} type='password' variant='filled' placeholder='Password' />
            </FormControl>


            <Button colorScheme='teal' variant='link' size='xs'>Fortgot Password</Button>
            <Box display='flex' flexDir='row' gap='4px' my='4'>
                <Button disabled={loading} isLoading={loading} onClick={login} flex={1} colorScheme='teal' variant='solid'>Login</Button>
                <Button disabled={loading} flex={1} colorScheme='teal' variant='outline'>Register</Button>
            </Box>

        </Box>
    )
}

export default Login;