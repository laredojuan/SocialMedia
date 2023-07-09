import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'lib/firebase'
import { useState } from 'react';
import { DASHBOARD } from 'lib/routes';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';

export function useAuth(){
    const [authUser, isLoading, error] = useAuthState(auth);
    return { user: authUser, isLoading, error };
}

export function useLogin(){
    const [isLoading, setLoading]= useState(false);
    const toast = useToast()

    async function login({email, password,redirectTo=DASHBOARD}){
        setLoading(true)
        try{
            
            await signInWithEmailAndPassword(auth, email, password)
        } catch(error){

        }

        setLoading(false)
    }
        
        
       

    return {login, isLoading}
}