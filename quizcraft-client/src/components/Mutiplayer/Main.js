import React, { useState, useEffect } from "react";
import { Chat } from "../Mutiplayer/Lobby";
import { Auth } from "../Mutiplayer/Auth";
import { Wrapper } from "../Mutiplayer/Wrapper";
import Cookies from "universal-cookie";
import "../style/Main.css";

const cookies = new Cookies();

function Lobby() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

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
          <input onChange={(e) => setRoom(e.target.value)} />
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
