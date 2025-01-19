import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export default function LoginButton() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext); // Pobierz stan użytkownika z UserContext

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token"); // Usuń token
        setUser(null); // Zresetuj stan użytkownika
        alert("Logged out successfully!");
        navigate("/"); // Przekierowanie na stronę główną
    };

    return user ? (
        <div className="flex items-center gap-x-2">
            <button
                onClick={handleLogout}
                className="p-1 border border-d-text-secondary text-sm rounded-md dark:text-d-text-primary flex items-center gap-x-2"
            >
                Logout
            </button>
        </div>
    ) : (
        <button
            onClick={() => navigate("/login")}
            className="p-1 border border-d-text-secondary text-sm rounded-md dark:text-d-text-primary flex items-center gap-x-2"
        >
            <FaUserAlt size={18} />
            <span>Login</span>
        </button>
    );
}
