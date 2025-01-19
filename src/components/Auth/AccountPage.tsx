import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function AccountPage() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        // Jeśli użytkownik nie jest zalogowany, przekieruj na stronę logowania
        if (!user) {
            alert("You need to log in first!");
            navigate("/login");
            return;
        }

        // Pobierz dane użytkownika z backendu
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${user.userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Przekazanie tokenu JWT
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    alert("Failed to fetch user data. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Usuń token z localStorage
        setUser(null); // Wyloguj użytkownika
        alert("Logged out successfully!");
        navigate("/"); // Przekieruj na stronę główną
    };

    return (
        <div className="flex flex-col items-center mt-10">
            {/* Przycisk wylogowania */}
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded mb-6"
            >
                Logout
            </button>

            {/* Informacje o użytkowniku */}
            {userData ? (
                <div className="p-6 max-w-md w-full bg-white shadow-md rounded">
                    <h1 className="text-2xl font-bold mb-4 text-center">Your Account</h1>
                    <p>
                        <strong>First Name:</strong> {userData.FirstName}
                    </p>
                    <p>
                        <strong>Last Name:</strong> {userData.LastName}
                    </p>
                    <p>
                        <strong>Email:</strong> {userData.Email}
                    </p>
                    <p>
                        <strong>Address:</strong> {userData.Address || "Not provided"}
                    </p>
                    <p>
                        <strong>Phone:</strong> {userData.Phone || "Not provided"}
                    </p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
