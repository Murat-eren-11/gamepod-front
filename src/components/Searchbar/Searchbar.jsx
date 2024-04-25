import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-container">
      <form
        onSubmit={handleSearch}
        className="flex relative justify-center mt-20 mb-40"
      >
        <input
          type="text"
          placeholder="Recherchez des jeux..."
          value={searchTerm}
          onChange={handleInputChange}
          className="border-2 border-gray-300 rounded-lg p-2 mr-2 text-black w-2/4 text-center"
        />

        <button type="submit" className="absolute z-10 text-gray-500 left-2/3 ">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="h-6 mt-2 ml-20"
          />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
