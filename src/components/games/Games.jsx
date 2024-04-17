import { useState, useEffect } from "react";
import axios from "axios";

const Games = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1); // Initialisation de la page

  const fetchGames = async (currentPage) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/games`,
        {
          params: { page: currentPage, page_size: 100 }, // Ajout des paramètres de pagination
        }
      );
      console.log(response.data.results); // Vérifier la structure des données dans la console
      return response.data.results; // Retourner les résultats directement
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  // Charger initialement les données et charger plus lors du changement de page
  useEffect(() => {
    fetchGames(page).then((newGames) => {
      if (newGames) {
        // Vérifier si newGames est non null
        setGames((prevGames) => [...prevGames, ...newGames]);
      }
    });
  }, [page]);

  // Gérer le scroll infini
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <div className="flex flex-row flex-wrap gap-20">
        {games.map((game, index) => (
          <div className="flex flex-col w-150" key={index}>
            <h3>{game.name}</h3>
            <img
              src={game.background_image}
              alt={game.name}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
              className="w-24"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Games;
