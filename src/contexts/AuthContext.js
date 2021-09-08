import React, { useContext, useState, useEffect } from "react";
import { auth, functions } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { httpsCallable } from "@firebase/functions";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isMod, setIsMod] = useState(false);

  const addAdminEmail = (email) => {
    const addMod = httpsCallable(functions, "addMod");
    addMod(email).then((result) => {
      setIsMod(true);
      console.log(result);
    });
  };

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  function logout() {
    setIsMod(false);
    return auth.signOut();
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((token) => {
          if (!!token.claims.moderator) {
            setIsMod(true);
          } else {
            setIsMod(false);
          }
        });
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    isMod,
    currentUser,
    signInWithGoogle,
    logout,
    addAdminEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
