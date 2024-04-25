import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ handleToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorBorder, setShowErrorBorder] = useState(false);
  const userSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email: email,
          password: password,
        }
      );
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Email ou mot de passe incorrect.");
        setShowErrorBorder(true);
      } else {
        setErrorMessage("Une erreur s'est produite lors de la connexion.");
      }
    }
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="flex flex-row justify-center items-center h-80 w-9/12 h-9/12">
        <div className="flex flex-row justify-center align-center">
          <div className="p-8  bg-gradient-to-b from-gray-900 rounded-l-lg">
            <h2 className="p-12 underline underline-offset-1 decoration-red-700 decoration-4 text-xl font-bold">
              Se connecter
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
                type="email"
                value={email}
                placeholder=" email@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: showErrorBorder ? "2px solid red" : "none" }}
                className="mt-8 h-8 rounded-lg text-black"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" ******"
                style={{ border: showErrorBorder ? "2px solid red" : "none" }}
                className="mt-8 h-8 rounded-lg text-black"
              />
              <div className="boutonerror">
                <input
                  type="submit"
                  value="Se connecter"
                  className="w-80 h-10 bg-red-700 rounded-lg mt-8"
                />
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
            </form>
            <Link to="/signup">
              <p className="text-center">Pas de compte ? Créez-en un !</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
