// context create kore nibo jeno overall project e authentication ta handle korte pari
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentuser) => {
      "currentuser", currentuser;
      setUser(currentuser);
      //================================================================//
      // JWT TOKEN ER KAJ KORBO JODI CURRENT USER THAKE.. Token create korar jonno server e request kortesi
      //================================================================//
      if (currentuser) {
        const userInfo = {
          email: currentuser.email,
        };
        console.log(userInfo);
        axiosPublic.post("/jwt", userInfo).then((res) => {
          console.log(res.data.token);
          // server theke token generate kore client e response hishebe paisi
          if (res.data.token) {
            // ekhane access-token ta hocche localStorage er ekta key ar res.data.token hocche key er value, jodi user thakle token ta res hoye ashe server theke tahole amra locastorage k bolbo  token k localstorage e set koro
            localStorage.setItem("access-token", res.data.token);
            //console.log(localStorage.getItem("access-token"));
          }
        });
      } else {
        // jodi user na thake tahole token ta remove kore dao,
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, [axiosPublic]);
  //================================================================//
  // USER CREATE
  //================================================================//
  const createuser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //================================================================//
  // USER LOGIN
  //================================================================//
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //================================================================//
  // USER LOGOut
  //================================================================//
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  //================================================================//
  // UPDATE USER PROFILE
  //================================================================//
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  //================================================================//
  // GOOGLE signin
  //================================================================//
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //================================================================//
  //context api er props to use others component on this web application
  //================================================================//
  const authInfo = {
    user,
    loading,
    createuser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
