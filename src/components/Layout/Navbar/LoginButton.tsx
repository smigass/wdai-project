import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token")// Usunięcie statusu zalogowanego
        alert("Logged out successfully!");
        navigate("/"); // Przekierowanie na stronę główną
    };

    return currentUser ? (
        <div className="flex items-center gap-x-2">
            <button onClick={handleLogout} className="p-1 border rounded">
                Logout
            </button>
        </div>
    ) : (
        <button
            onClick={() => navigate("/login")}
            className="p-2 border rounded flex items-center gap-x-2"
        >
            <FaUserAlt size={18} />
            <span>Login</span>
        </button>
    );
}
