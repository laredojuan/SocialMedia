import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Text } from "@chakra-ui/react";
import { REGISTER } from "lib/routes";
import { Link as RouterLink} from "react-router-dom";
import { useLogin } from "hooks/auth"

export default function Login() {
    const {login, isLoading}= useLogin();

  return ( 
  <Center w='100%' h='100vh'>
    <Box mx='1' maxw='md' p='9' borderWidth='1px' borderRadius='lg'>
    <Heading mb='4' size='lg' textAlign='center' >
        LOG IN 
    </Heading>
    <form onSubmit={()=>{}}>
        <FormControl isInvalid={true} py='2'>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder="Email"/>
            <FormErrorMessage>The email you put is invalid</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={true} py='2'>
            <FormLabel>Password</FormLabel>
            <Input type='password' placeholder="Password"/>
            <FormErrorMessage>The Password you put is invalid</FormErrorMessage>
        </FormControl>
        <Button 
        mt='4' 
        type='submit' 
        colorScheme="teal" 
        size='md' 
        w='full' 
        isLoading={true}
        loadingText='Logging In'>
            LOG IN
        </Button>

    </form>

    <Text mt='6' fontSize='xlg' align='center'>
        Don't have an account?{" "}
         <Link 
         as={RouterLink}
         to={REGISTER} 
         color='teal.800' 
         fontWeight='medium' 
         textDecor='underline' 
         _hover={{background:'teal.100'}} >
         Register
         </Link> {" "}
         Instead 
    </Text>
 
    </Box>
    </Center>
    )
}
