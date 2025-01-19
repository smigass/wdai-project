import { useEffect, useState } from "react";

export default function AccountPage() {
    const [user, setUser] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showPasswordInput, setShowPasswordInput] = useState(false); // Kontrola widoczności pola hasła
    const [newPassword, setNewPassword] = useState(""); // Stan dla nowego hasła
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Wiadomość o powodzeniu
    const [passwordError, setPasswordError] = useState<string | null>(null); // Błędy zmiany hasła

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("currentUser");

            if (!token || !storedUser) {
                setError("You need to log in to view this page.");
                return;
            }

            try {
                const { userId } = JSON.parse(storedUser); // Pobieramy userId z currentUser

                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Dodajemy token do nagłówków
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    const errorText = await response.text();
                    setError(errorText || "Failed to fetch user data.");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("An unexpected error occurred. Please try again.");
            }
        };

        fetchUserData();
    }, []);

    // Funkcja walidująca hasło
    const validatePassword = (password: string) => {
        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRequirements.test(password)) {
            setPasswordError(
                "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
            );
            return false;
        }
        setPasswordError(null);
        return true;
    };

    const handlePasswordChange = async () => {
        setPasswordError(null);
        setSuccessMessage(null);

        if (!validatePassword(newPassword)) {
            return; // Jeśli hasło nie przejdzie walidacji, funkcja się zatrzyma
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setPasswordError("You need to log in to change your password.");
                return;
            }

            const response = await fetch("http://localhost:3000/users/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newPassword }),
            });

            if (response.ok) {
                setSuccessMessage("Password changed successfully!");
                setNewPassword(""); // Resetuj pole hasła
                setShowPasswordInput(false); // Ukryj pole hasła po zmianie
            } else {
                const errorText = await response.text();
                setPasswordError(errorText || "Failed to change password.");
            }
        } catch (err) {
            console.error("Error changing password:", err);
            setPasswordError("An unexpected error occurred. Please try again.");
        }
    };

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="p-6 max-w-md w-full dark:bg-gray-700 shadow-md rounded">
                <h1 className="text-2xl font-bold mb-6 text-center">Your Account</h1>
                <p className="mb-4">
                    <strong>Email:</strong> {user.Email}
                </p>
                <p className="mb-4">
                    <strong>First Name:</strong> {user.FirstName}
                </p>
                <p className="mb-4">
                    <strong>Last Name:</strong> {user.LastName}
                </p>
                <p className="mb-4">
                    <strong>Address:</strong> {user.Address}
                </p>
                <p className="mb-4">
                    <strong>Phone:</strong> {user.Phone}
                </p>
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Change Password</h2>
                    {!showPasswordInput ? (
                        <button
                            onClick={() => setShowPasswordInput(true)}
                            className="bg-blue-500 text-white px-4 py-2 w-full rounded"
                        >
                            Change Password
                        </button>
                    ) : (
                        <>
                            <input
                                type="password"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="block w-full p-2 border mb-4 rounded"
                            />
                            <button
                                onClick={handlePasswordChange}
                                className="bg-blue-500 text-white px-4 py-2 w-full rounded"
                            >
                                Submit New Password
                            </button>
                        </>
                    )}
                    {passwordError && <p className="text-red-500 mt-4">{passwordError}</p>}
                    {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("currentUser");
                        window.location.reload(); // Odświeżenie strony
                    }}
                    className="bg-red-500 text-white px-4 py-2 w-full rounded mt-6"
                >
                    Log out
                </button>
            </div>
        </div>
    );
}