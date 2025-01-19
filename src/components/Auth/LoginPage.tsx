import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null); // Przechowuje komunikat błędu
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(null); // Reset błędu na początku próby logowania

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token); // Zapis tokenu JWT
                alert("Login successful!");
                navigate("/"); // Przekierowanie na stronę główną
            } else if (response.status === 401) {
                setError("Invalid email or password."); // Komunikat błędu przy złych danych
            } else {
                setError("An unexpected error occurred. Please try again."); // Inne błędy
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Unable to connect to the server. Please try again later."); // Problem z połączeniem
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="p-6 max-w-md w-full bg-white shadow-md rounded">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full p-2 border mb-4 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-2 border mb-4 rounded"
                />
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 w-full rounded"
                >
                    Log in
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>} {/* Wyświetlanie błędu */}
                <p
                    className="text-blue-500 text-center mt-4 cursor-pointer"
                    onClick={() => navigate("/register")}
                >
                    Don't have an account? Register here
                </p>
            </div>
        </div>
    );
}
