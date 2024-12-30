import { createContext, useEffect, useState } from "react";
import { app } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";



export const AuthContext=createContext(null)
const auth=getAuth(app)
const gooogleProvider=new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const[user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    // sign in with google
    const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,gooogleProvider)
    }

    //create user using email and password
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    //update user name and photo url
    const updateUserProfile=(name,photo)=>{
    //   return  updateProfile(auth.createUser,{
    //         displayName:name,
    //         photoURL:photo
    //     })
    if (auth.currentUser) {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    } else {
        return Promise.reject(new Error("No user is currently signed in"));
    }
    }

      //save user as reader
  const saveUser=async user=>{
    const currentUser={
      email:user?.email,
      role:'reader',
      status:'Verified',
    }
    const {data}=await axios.put(`${import.meta.env.VITE_API_URL}/user`,currentUser)
    return data
   
  }

      //save user author
  // const saveUser=async user=>{
  //   const currentUser={
  //     email:user?.email,
  //     role:'author',
  //     status:'Verified',
  //   }
  //   const {data}=await axios.put(`${import.meta.env.VITE_API_URL}/user`,currentUser)
  //   return data
  // }

      //save user admin
  // const saveUser=async user=>{
  //   const currentUser={
  //     email:user?.email,
  //     role:'admin',
  //     status:'Verified',
  //   }
  //   const {data}=await axios.put(`${import.meta.env.VITE_API_URL}/user`,currentUser)
  //   return data
  // }

    //login using email password
    const signInEmailPassword=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

     // Get ID token for the current user
     const getIdToken = async () => {
        if (auth.currentUser) {
            return await auth.currentUser.getIdToken();
        } else {
            return Promise.reject(new Error("No user is currently signed in"));
        }
    };

     // onAuthStateChange
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, currentUser => {
  //     setUser(currentUser)
  //     if(currentUser)
  //     {
  //       saveUser(currentUser)
       
  //     }
      
  //     console.log('CurrentUser-->', currentUser)
  //     setLoading(false)
  //   })
  //   return () => {
  //     return unsubscribe()
  //   }
  // }, [])

   // onAuthStateChange with jwt token
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      const userEmail=currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser)
      if(currentUser)
      {
        saveUser(currentUser)
        // console.log('from auth',loggedUser);
      const result= axios.post(`${import.meta.env.VITE_API_URL}/jwt`,loggedUser,{withCredentials:true})
       
      }
      else
      {
        const {result}= axios.post(`${import.meta.env.VITE_API_URL}/logout`,loggedUser,{withCredentials:true})
        console.log(result);
      }
      
      console.log('CurrentUser-->', currentUser)
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])


  const logOut=()=>{
    setLoading(true)
    return signOut(auth)
  }

    const authInfo={
        signInWithGoogle,
        createUser,
        updateUserProfile,
        signInEmailPassword,
        setUser,
        user,
        logOut,
        getIdToken,

    }
       
    

    return (

       <AuthContext.Provider value ={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;