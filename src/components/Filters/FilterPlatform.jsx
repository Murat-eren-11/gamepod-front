import { useState, useEffect } from "react";
import axios from "axios";

const FilterPlatform = ({ onPlatformChange }) => {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/platforms`
        );
        setPlatforms(response.data.results);
      } catch (error) {
        console.error("Failed to fetch platforms:", error);
      }
    };

    fetchPlatforms();
  }, []);

  const handleChange = (event) => {
    setSelectedPlatform(event.target.value);
    onPlatformChange(event.target.value);
  };

  return (
    <select
      value={selectedPlatform}
      onChange={handleChange}
      className="border-2 border-none bg-gray-600 rounded p-2 text-white mr-2"
    >
      <option value="">Toutes les consoles</option>
      {platforms.map((platform) => (
        <option key={platform.id} value={platform.id}>
          {platform.name}
        </option>
      ))}
    </select>
  );
};

export default FilterPlatform;
