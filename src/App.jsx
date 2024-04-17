import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Games from "./components/games/Games";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/games" element={<Games />} />
      </Routes>
    </Router>
  );
};

export default App;
