import {Link} from "react-router-dom";
import axios from "axios";
import {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Header = ({handleToken, token}) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/gameuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userFound = response.data;
        setUsername(userFound.username);
        setAvatar(userFound.avatar);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <header className="h-20 border-solid border-b-2 border-red-600">
      <div className="flex justify-around max-w-screen-2xl pt-6">
        <Link to="/">
          <div className="flex flex-row gap-8">
            <FontAwesomeIcon icon="gamepad" className="h-10" />
            <h2 className="text-3xl">Gamepad</h2>
          </div>
        </Link>
        <div className="flex mr-1">
          <Link to="/collection">
            <h2 className="mr-12 text-xl">My Collection</h2>
          </Link>
          {token ? (
            <Link to="/profile">
              <div className="flex flex-row gap-4">
                <h2 className="text-xl rounded-lg">
                  {username || "Loading..."}
                </h2>
                <img
                  src={
                    avatar
                      ? avatar
                      : "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f642.png"
                  }
                  alt={username}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-red-500 w-20 h-9 text-xl rounded-lg">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
