import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'lib/firebase'
import { useState } from 'react';
import { DASHBOARD } from 'lib/routes';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function useAuth(){
    const [authUser, isLoading, error] = useAuthState(auth);
    return { user: authUser, isLoading, error };
}

export function useLogin(){
    const [isLoading, setLoading]= useState(false);
    const toast = useToast()
    const navigate = useNavigate()

    async function login({email, password,redirectTo=DASHBOARD}){
        setLoading(true)
        try{
            
            await signInWithEmailAndPassword(auth, email, password)
            toast({
                title: 'You are logged in',
                status: 'success',
                isClosable: true,
                position: 'top',
                duration: 5000,
            });
            navigate(redirectTo)
        } catch(error){
            toast({
                title: 'Failed to log in',
                description: error.message,
                status: 'eror',
                isClosable: true,
                position: 'top',
                duration: 5000,
            });
            return false // if login failed
        }
        setLoading(false)
        return true; // return true if login was sucessful
    }
    return {login, isLoading}
}