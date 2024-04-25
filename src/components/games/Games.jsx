import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import FilterGenre from "../Filters/FilterGenres";
import FilterPlatform from "../Filters/FilterPlatform";
import SortGames from "../Filters/SortGames";

const Games = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);

      const params = {
        page,
        page_size: 30,
        search: searchQuery,
      };

      if (platform) params.platforms = platform;
      if (genre) params.genres = genre;
      if (sortField && sortOrder) {
        params.ordering = `${sortOrder === "asc" ? "" : "-"}${sortField}`;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/games`,
          { params }
        );
        const newGames = response.data.results;
        setGames((prevGames) =>
          page === 1 ? newGames : [...prevGames, ...newGames]
        );
        setHasMore(newGames.length > 0);
      } catch (error) {
        console.error("Failed to fetch games:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [page, searchQuery, platform, genre, sortField, sortOrder]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (nearBottom && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoading]);

  return (
    <main className="m-auto">
      <Searchbar
        onSearch={(query) => {
          setSearchQuery(query);
          setPage(1);
          setGames([]);
        }}
      />
      <div className="flex justify-between mx-10">
        <div>
          <FilterPlatform
            onPlatformChange={(platform) => {
              setPlatform(platform);
              setPage(1);
              setGames([]);
            }}
          />
          <FilterGenre
            onGenreChange={(genre) => {
              setGenre(genre);
              setPage(1);
              setGames([]);
            }}
          />
        </div>
        <div>
          <SortGames
            onSortChange={(field, order) => {
              setSortField(field);
              setSortOrder(order);
              setPage(1);
              setGames([]);
            }}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-10 justify-center mt-20">
        {games.map((game, index) => (
          <div className="flex flex-col w-150 relative text-center" key={index}>
            <Link to={`/${game.id}`}>
              <img
                src={game.background_image || "https://via.placeholder.com/150"}
                alt={game.name}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                }
                className="w-52 h-64 object-cover rounded-lg"
              />
              <p className="text-sm text-wrap max-w-52 absolute inset-x-0 bottom-0 bg-black/50 h-10 text-bold pt-2 font-bold">
                {game.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Games;
