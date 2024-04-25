import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Games from "./components/games/Games";
import Header from "./components/Header/Header";
import Game from "./components/Game/Game";
import Cookies from "js-cookie";
import { useState } from "react";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Singup";
import Collection from "./components/Collection/Collection";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faList,
  faGamepad,
  faEllipsis,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faList, faGamepad, faEllipsis, faBookmark);
import Profile from "./components/Profile/Profile";

const App = () => {
  const [token, setToken] = useState(Cookies.get("game-token") || null);
  const handleToken = (newToken) => {
    if (newToken) {
      Cookies.set("game-token", newToken, { expires: 15 });
      setToken(newToken);
    } else {
      Cookies.remove("game-token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header handleToken={handleToken} token={token} />
      <Routes>
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/" element={<Games />} />
        <Route path="/:id" element={<Game token={token} />} />
        <Route path="/collection" element={<Collection token={token} />} />
        <Route
          path="/profile"
          element={<Profile token={token} handleToken={handleToken} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
