// import { useNavigate } from 'react-router-dom';
// import { auth } from '../firebase.js';
// import React, { useState, useEffect } from "react";
// import firebase from '../firebase';
// // import "firebase/firestore";
// // import firestore from "../firestore";


// const App = () => {
//   const [gameCode, setGameCode] = useState(null);
//   const [gameRooms, setGameRooms] = useState([]);

//   // Commented out some code because it has causing bugs now
//   // const firestore = firebase.firestore();
//   // const gamesRef = firestore.collection("games");

//   // useEffect(() => {
//   //   const checking = gamesRef.onSnapshot((snapshot) => {
//   //     const gameRooms = [];
//   //     snapshot.forEach((doc) => {
//   //       gameRooms.push(doc.id);
//   //     });
//   //     setGameRooms(gameRooms);
//   //   });
//   //   return checking;
//   // }, [gamesRef]);

//   const handleCreateGame = () => {
//     let newGameCode = 1;
//     while (gameRooms.includes(String(newGameCode))) {
//       newGameCode += 1;
//     }
//     setGameCode(String(newGameCode));
//   };

//   const handleStartGame = () => {};

//   return (
//     <div>
//       <h1>Multiplayer Quiz App</h1>
//       {gameCode ? (
//         <Lobby gameCode={gameCode} onStartGame={handleStartGame} />
//       ) : (
//         <>
//           <p>Available rooms: {gameRooms.join(", ")}</p>
//           <button onClick={handleCreateGame}>Create Game</button>
//         </>
//       )}
//     </div>
//   );
// };


// const Lobby = ({ roomId, onStartGame }) => {
//   const [players, setPlayers] = useState([]);

//   // Commented out some code because it has causing bugs now
//   // const firestore = firebase.firestore();
//   // const roomRef = firestore.collection("rooms").doc(roomId);

//   // useEffect(() => {
//   //   const checking = roomRef.onSnapshot(snapshot => {
//   //     setPlayers(snapshot.data().players);
//   //   });
//   //   return checking;
//   // }, [roomRef]);

//   const handleStartGame = () => {
//     onStartGame();
//   };

//   return (
//     <div>
//       <h2>Game Lobby</h2>
//       <p>Room ID: {roomId}</p>
//       <p>Player List: </p>
//       <ul>
//         {players.map(player => (
//           <li key={player.id}>{player.name}</li>
//         ))}
//       </ul>
//       {players.length > 1 ? (
//         <button onClick={handleStartGame}>Start Game</button>
//       ) : (
//         <p>Waiting for players to join...</p>
//       )}
//     </div>
//   );
// };

// export default Lobby;
