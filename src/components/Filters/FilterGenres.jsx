import { useState, useEffect } from "react";
import axios from "axios";

const FilterGenre = ({ onGenreChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/genres`
        );
        setGenres(response.data.results);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
    onGenreChange(event.target.value);
  };

  return (
    <select
      value={selectedGenre}
      onChange={handleChange}
      className="border-2 border-none bg-gray-600 rounded p-2 text-white"
    >
      <option value="">Select a Genre</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default FilterGenre;
