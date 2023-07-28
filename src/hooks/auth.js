import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "lib/firebase";
import { useState, useEffect } from "react";
import { DASHBOARD, LOGIN } from "lib/routes";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import isUsernameExists from "utils/isUsernameExist";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true); //usually never start with false here
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data()); //snapshot that has all information. using data to get data of the doc
      setLoading(false);
    }
    if (!authLoading) {
      //it's done fetching the user it's going to run fetchdata
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading]);

  return { user, isLoading, error };
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = DASHBOARD }) {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Failed to log in",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
      return false; // if login failed
    }
    setLoading(false);
    return true; // return true if login was sucessful
  }
  return { login, isLoading };
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);
    if (usernameExists) {
      toast({
        title: "Username already exists",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          //telling firestore where this is going
          id: res.user.uid, //it doesn't return the id, you have to manually put it. This way you add it here
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });
        toast({
          title: "Account created",
          description: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        navigate(redirectTo);
      } catch (error) {
        toast({
          title: "Signing Up failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  }
  return { register, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const navigate = useNavigate();
  const toast = useToast();
  async function logout() {
    if (await signOut()) {
      toast({
        title: "Logged out",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(LOGIN);
    }
  }

  return { logout, isLoading };
}
