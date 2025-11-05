import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow sticky top-0 z-20 px-4 sm:px-6 py-3 flex justify-between items-center">
      <h2 className="font-semibold text-green-800">Welcome, {user}</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Logout
      </button>
    </div>
  );
}
