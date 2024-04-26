import {useState, useEffect} from "react";
import axios from "axios";

const Comments = ({id, token}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/${id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, [id, token]);

  const addComment = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${id}`,
        {text: newComment},
        {headers: {Authorization: `Bearer ${token}`}}
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      alert("Failed to post comment");
    }
  };

  return (
    <div className="mb-16 max-w-2xl flex flex-col items-center mx-auto">
      <h3 className="text-center my-10 underline underline-offset-1 decoration-red-700 decoration-4 text-3xl font-bold">
        Commentaires
      </h3>

      {comments.map((comment) => (
        <p
          key={comment._id}
          className="mb-8 h-20 w-96 text-wrap bg-gray-800 text-center flex items-center justify-center rounded-lg"
        >
          <strong className="mr-1">{comment.user.username} : </strong>

          {comment.text}
        </p>
      ))}
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Ajoutez un commentaire"
        className="transition-all duration-300 text-black ease-in-out w-64 focus:w-96 p-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={addComment}
        className="px-4 py-2 mt-10 w-96 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Submit
      </button>
    </div>
  );
};

export default Comments;
