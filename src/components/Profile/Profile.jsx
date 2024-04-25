import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = ({ token, handleToken }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/gameuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (currentPassword) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/update`,
          { username, email, password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Profile updated successfully");
      } catch (error) {
        alert("Failed to update profile: " + error.response?.data.message);
      }
    } else {
      alert("Please enter your current password to make changes");
    }
  };

  const logout = () => {
    handleToken(null);
    navigate("/");
  };

  if (loading) {
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
      <h2 className="text-center p-12 underline underline-offset-1 decoration-red-700 decoration-4 text-4xl font-bold">
        Bienvenue, {user ? user.username : "User"}
      </h2>
      <form
        onSubmit={handleUpdate}
        className="flex flex-col justify-center items-center h-80"
      >
        <label className="flex flex-row justify-evenly mb-6">
          Username :
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="ml-6"
          />
        </label>
        <label className="mb-6">
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ml-14"
          />
        </label>
        <label className="mb-6">
          Mot de passe actuel :
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="ml-10"
          />
        </label>
        <label className="mb-6">
          Nouveau Mot De Passe (Si vous ne voulez pas le changer, n'y touchez
          pas) :
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="ml-10"
          />
        </label>
        <button type="submit" className="w-80 h-10 bg-red-700 rounded-lg mt-8">
          Update Profile
        </button>
      </form>
      <button onClick={logout} className="w-80 h-10 bg-red-700 rounded-lg mt-8">
        Log Out
      </button>
    </main>
  );
};

export default Profile;
