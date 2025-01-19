import { useState } from "react";

export default function NewsletterPage() {
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubscribe = async () => {
        setMessage(null); // Resetuj komunikaty

        try {
            const token = localStorage.getItem("token"); // Pobierz token JWT z localStorage
            if (!token) {
                setMessage("You need to log in to subscribe to the newsletter.");
                setSuccess(false);
                return;
            }

            const response = await fetch("http://localhost:3000/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Dodanie nagłówka autoryzacji
                },
            });

            if (response.ok) {
                setMessage("Successfully subscribed to the newsletter!");
                setSuccess(true);
            } else {
                const errorText = await response.text();
                setMessage(errorText || "An error occurred. Please try again.");
                setSuccess(false);
            }
        } catch (error) {
            console.error("Error subscribing:", error);
            setMessage("Unable to connect to the server. Please try again later.");
            setSuccess(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="p-6 max-w-md w-full bg-white shadow-md rounded">
                <h1 className="text-2xl font-bold mb-6 text-center">Newsletter Subscription</h1>
                <button
                    onClick={handleSubscribe}
                    className="bg-blue-500 text-white px-4 py-2 w-full rounded"
                >
                    Subscribe
                </button>
                {message && (
                    <p
                        className={`mt-4 ${
                            success ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
