import { createContext, ReactNode, useEffect, useState } from "react";

import { app } from "../firebase_config/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  UserCredential,
} from "firebase/auth";
import axios from "axios";

// Define the type for the context value
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  googleLogin: () => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = (): Promise<void> => {
    return signOut(auth);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser && currentUser?.email) {
        axios
          .post("http://localhost:3000/jwt", {
            email: currentUser.email,
          })
          .then((data) => {
            if (data?.data?.token) {
              localStorage.setItem("gadget-shop", data?.data?.token);
              setLoading(false);
            }
          });
      } else {
        localStorage.removeItem("gadget-shop");
        setLoading(false);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo: AuthContextType = {
    user,
    loading,
    createUser,
    logOut,
    loginUser,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
