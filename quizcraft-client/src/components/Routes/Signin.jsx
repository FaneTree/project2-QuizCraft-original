import React,{ useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../firebase";

const provider = new GoogleAuthProvider();

export default function Signin (props) {

    function _handleSignIn (){
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log("google account user info ---- ", user.displayName, user.email)
            // add the user information to the users collection in the Firestore
            const usersCollectionRef = collection(db,'users')
            addDoc(usersCollectionRef,{
                displayName: user.displayName,
                email: user.email,
                uid: user.uid
            })

        }).catch((error) => console.log(error.message))
        // ...
    }

    return (
        <div>
            <h1>Sign in with Google Account</h1>
            <button onClick={_handleSignIn}>Sign in with Google</button>
        </div>
    )
}