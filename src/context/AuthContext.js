import React, { useEffect, useRef, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router";
import Loader from "../Helpers/Loader";
import { collection, getDocs } from "firebase/firestore";
import { createUserInDb, fetchUser } from "../api/api";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  // const location = useLocation();
  const timeout = useRef();
  console.log("AuthProvider", { isLoading });

  async function login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        navigate("/");
      }
      return true;
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      setErrorMessage("Invalid Email/Password");
      return false;
    }
  }

  function register({ email, password, firstName, lastName }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(true);

        setIsLoading(true);

        // Signed in
        const user = userCredential.user;
        createUserInDb({
          email,
          uid: user?.uid,
          firstName,
          lastName,
          events: [],
        });
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/weak-password") {
          setErrorMessage("Password is Weak");
        } else {
          setErrorMessage(errorMessage);
        }
      });
  }
  async function resetPassword(email) {
    try {
      const data = await sendPasswordResetEmail(auth, email);

      return data;
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      return false;
    }
  }
  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Sucessfull");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user != null) {
        const usr = await fetchUser(user?.uid);
        setIsAuthenticated(true);
        setUser(usr);
      } else {
        setIsAuthenticated(false);
        console.log("😢 We are not authenticated!");
      }
      setIsLoading(false);
    });
    return () => {
      subscription();
      clearTimeout(timeout.current);
    };
  }, []);

  const setErrorMessage = (err) => {
    setError(err);
    if (timeout.current) {
      console.log(timeout.current);
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchedEvents = [];
    console.log("We are fetching events...");

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "events"));
      querySnapshot.forEach((doc) => {
        fetchedEvents.push(doc.data());
      });
      setEvents(fetchedEvents);
      setAllEvents(fetchedEvents);
    }
    fetchData();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signOutUser,
        login,
        error,
        events,
        setEvents,
        register,
        allEvents,
        setUser,
        resetPassword,
      }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};
