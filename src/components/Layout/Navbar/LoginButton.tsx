import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export default function LoginButton() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext); // Pobierz stan użytkownika z UserContext


    return !user ?  <button
        onClick={() => navigate("/login")}
        className="p-1 border border-d-text-secondary text-sm rounded-md dark:text-d-text-primary flex items-center gap-x-2"
    >
        <FaUserAlt size={18} />

    </button> : <></>;
}