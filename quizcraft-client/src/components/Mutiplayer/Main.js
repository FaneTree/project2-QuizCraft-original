import React, { useState, useEffect } from "react";
import { Chat } from "./Chat";
import { Auth } from "../Mutiplayer/Auth";
import { Wrapper } from "../Mutiplayer/Wrapper";
import Cookies from "universal-cookie";
import "../style/Main.css";
import { db } from "../firebase";
import { collection, where, onSnapshot, query } from "firebase/firestore";
const cookies = new Cookies();

function Lobby() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users");

  //   useEffect(() => {
  //     const queryUsers = query(usersRef, where("room", "==", room));
  //     const unsubscribe = onSnapshot(queryUsers, (snapshot) => {
  //       let users = [];
  //       snapshot.forEach((doc) => {
  //         users.push({ ...doc.data(), id: doc.id });
  //       });
  //       setUsers(users);
  //     });
  //     return () => unsubscribe();
  //   }, []);

  if (!isAuth) {
    return (
      <Wrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
        <Auth setIsAuth={setIsAuth} />
      </Wrapper>
    );
  }

  return (
    <Wrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room code: </label>
          <input onChange={(e) => setRoom(e.target.value)} required />
          <button
            onClick={() => {
              setIsInChat(true);
            }}
          >
            Enter room
          </button>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </Wrapper>
  );
}

export default Lobby;
