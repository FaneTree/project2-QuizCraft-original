import React, { useState, useEffect } from "react";

import { db, auth, usersRef } from "../firebase";
import {
  doc,
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { where, query, deleteDoc, getDocs } from "firebase/firestore";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useParams } from "react-router-dom"

import "../style/Chat.css";
import "../style/Main.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Chatroom (props) {
    // to check user exist or not
    const [user] = useAuthState(auth);
    // get data from url
    let { gameId, playerId } = useParams();

    // manage messages
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(db, "messages");

    const [users, setUsers] = useState([]);
    const usersRef = collection(db, "users");

    // create functions
    
    // to add user into database in order to check
    const addUser = async () => {
        await removeUser();
        await addDoc(usersRef, {
          user: auth.currentUser.displayName,
          room,
        });
    };
    // to remove user from database in order to check
    const removeUser = async () => {
        // console.log("removing user");
        const q = query(
          usersRef,
          where("user", "==", auth.currentUser.displayName)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(function (doc) {
          deleteDoc(doc.ref);
        });
    };

    return (
        <div>

        </div>
    );
}