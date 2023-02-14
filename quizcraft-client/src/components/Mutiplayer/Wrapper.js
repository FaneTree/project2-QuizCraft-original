import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Wrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="lobby-banner">
      <div className="app-header">
        <h1> Game Lobby </h1>
      </div>

      <div className="app-container">{children}</div>
      {isAuth && (
        <div className="sign-out">
          <button onClick={signUserOut}> Sign Out</button>
        </div>
      )}
    </div>
  );
};
