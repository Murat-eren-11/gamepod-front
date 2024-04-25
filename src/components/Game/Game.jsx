import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comments from "../Comments/Comments";

const Game = ({ token }) => {
  const [game, setGame] = useState(null);
  const [isInCollection, setIsInCollection] = useState(false);
  const [isInTodoList, setIsInTodoList] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gameRes, collectionRes, todoRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/game/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/collection/collection`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/collection/todo`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setGame(gameRes.data);
        setIsInCollection(collectionRes.data.some((item) => item.id === id));
        setIsInTodoList(todoRes.data.some((item) => item.id === id));
      } catch (error) {
        console.error("Error fetching game details and status:", error.message);
      }
    };

    fetchData();
  }, [id, token]);

  const handleCollection = async () => {
    try {
      const method = isInCollection ? "delete" : "post";
      const url = `${import.meta.env.VITE_API_URL}${
        isInCollection
          ? `/collection/collection/${id}`
          : "/collection/collection"
      }`;
      const response = await axios({
        method: method,
        url: url,
        data: { id },
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsInCollection(!isInCollection);
      alert(
        isInCollection ? "Removed from Collection!" : "Added to Collection!"
      );
    } catch (error) {
      alert(error.response?.data.message || "Failed to update collection");
    }
  };

  const handleTodoList = async () => {
    try {
      const method = isInTodoList ? "delete" : "post";
      const url = `${import.meta.env.VITE_API_URL}${
        isInTodoList ? `/collection/todo/${id}` : "/collection/todo"
      }`;
      const response = await axios({
        method: method,
        url: url,
        data: { id },
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsInTodoList(!isInTodoList);
      alert(isInTodoList ? "Removed from Todo List!" : "Added to Todo List!");
    } catch (error) {
      alert(error.response?.data.message || "Failed to update todo list");
    }
  };

  if (!game) {
    return (
      <main>
        <div className="text-center mt-80">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h2 className="text-center mt-20 underline underline-offset-1 decoration-red-700 decoration-4 text-4xl font-bold">
        {game.name}
      </h2>
      <div className="flex flex-row p-20 sm:max-xl:flex-col">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-96 h-80 object-cover"
        />
        <div className="flex flex-col">
          <div className="flex flex-row gap-20 ml-20 mb-20">
            <div className="flex w-32 h-20 border-solid border-2 rounded-lg items-center justify-center p-4">
              <FontAwesomeIcon icon="bookmark" className="pb-6 pt-6 mr-2" />
              <button onClick={handleCollection}>
                {isInCollection
                  ? "Remove from Collection"
                  : "Save to Collection"}
              </button>
            </div>
            <div className="flex w-32 h-20 border-solid border-2 rounded-lg items-center justify-center p-4">
              <FontAwesomeIcon icon="list" className="pb-6 pt-6 mr-2" />
              <button onClick={handleTodoList}>
                {isInTodoList ? "Remove from Todo List" : "Add to the TodoList"}
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-around gap-20">
            <div className="flex flex-col">
              <h5 className="text-zinc-600">Platforms</h5>
              <div>
                <p className="w-64 text-wrap">
                  {game.platforms
                    .map((platform) => platform.platform.name)
                    .join(", ")}
                </p>
              </div>
            </div>
            <div className="flex flex-col w-64 text-wrap">
              <h5 className="text-zinc-600">Genres</h5>
              <p>{game.genres.map((genre) => genre.name).join(", ")}</p>
            </div>
          </div>
          <div className="flex flex-row gap-20 justify-around">
            <div className="flex flex-col w-64 text-wrap">
              <h5 className="text-zinc-600">Release Date</h5>
              <p>{game.released}</p>
            </div>
            <div className="flex flex-col w-64 text-wrap">
              <h5 className="text-zinc-600">Developers</h5>
              <p>{game.developers.map((dev) => dev.name).join(", ")}</p>
            </div>
          </div>
          <div className="flex flex-row gap-20 justify-around">
            <div className="flex flex-col w-64 text-wrap">
              <h5 className="text-zinc-600">Publisher</h5>
              <p>
                {game.publishers.map((publisher) => publisher.name).join(", ")}
              </p>
            </div>
            <div className="flex flex-col w-64 text-wrap">
              <h5 className="text-zinc-600">Age Rating</h5>
              <p>{game.esrb_rating ? game.esrb_rating.name : "No rating"}</p>
            </div>
          </div>
          <div className="flex flex-col mt-20">
            <h5 className="text-zinc-600">About</h5>
            <p className="m-w-90 text-wrap">
              {game.description_raw.slice(0, 500)}...
            </p>
          </div>
        </div>
      </div>
      <Comments id={id} token={token} />
    </main>
  );
};

export default Game;
