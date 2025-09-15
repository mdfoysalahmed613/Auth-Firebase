import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import auth from "@/Config/firebase";
const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateInfo = (user, name, uploadedUrl) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: uploadedUrl,
    });
  };

  const googlePopUp = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };
  const sendResetEmail = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const verifyEmail = () => {
    setLoading(true);
    return sendEmailVerification(user);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const userInfo = {
    user,
    loading,
    setLoading,
    verifyEmail,
    createUser,
    loginUser,
    updateInfo,
    logout,
    sendResetEmail,
    googlePopUp,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};
const useAuth = ()=>{
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export {AuthProvider,useAuth}