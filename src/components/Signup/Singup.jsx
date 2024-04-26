import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Signup = ({handleToken}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const userSignUp = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        formData,
        {headers: {"Content-Type": "multipart/form-data"}}
      );
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      alert(error.response?.data.message || "Signup failed");
    }
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="flex flex-row justify-center items-center h-80 w-9/12 h-9/12">
        <div className="flex flex-row justify-center align-center">
          <div className="p-8  bg-gradient-to-b from-gray-900 rounded-l-lg">
            <h2 className="p-12 underline underline-offset-1 decoration-red-700 decoration-4 text-xl font-bold">
              Pourquoi s'inscrire ?
            </h2>
            <p className="mb-6 text-lg">
              Connecte toi à ton compte pour avoir toutes les features
            </p>
            <p className="mb-6 text-lg">Ajoute un jeu à ta collection</p>
            <p className="mb-6 text-lg">Laisse un avis sur un jeu</p>
          </div>
          <div className="border-solid border-2 border-red-700"></div>
          <div className="bg-gray-900 rounded-r-lg">
            <form onSubmit={userSignUp} className="flex flex-col p-4 mt-8">
              <h2 className="underline underline-offset-1 decoration-red-700 decoration-4 text-xl font-bold">
                Inscrivez-vous
              </h2>
              <input
                className="mt-8 h-8 rounded-lg text-black"
                type="text"
                value={username}
                placeholder=" Pseudo"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                value={email}
                placeholder=" email@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-8 h-8 rounded-lg text-black"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" ********"
                className="mt-8 mb-8 h-8 rounded-lg text-black"
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-4"
              />
              <button
                className="w-80 h-10 bg-red-700 rounded-lg mt-4"
                type="submit"
              >
                Inscrivez-vous
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
