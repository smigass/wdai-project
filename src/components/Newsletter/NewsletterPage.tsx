import { useState, useEffect } from "react";

export default function NewsletterPage() {
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await fetch("http://localhost:3000/newsletter/check", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsSubscribed(data.subscribed);
                } else {
                    console.error("Failed to check subscription.");
                }
            } catch (error) {
                console.error("Error checking subscription:", error);
            }
        };

        checkSubscription();
    }, []);

    const handleSubscribe = async () => {
        setMessage(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("You need to log in to subscribe to the newsletter.");
                setSuccess(false);
                return;
            }

            const response = await fetch("http://localhost:3000/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setMessage("Successfully subscribed to the newsletter!");
                setSuccess(true);
                setIsSubscribed(true);
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

    const handleUnsubscribe = async () => {
        setMessage(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("You need to log in to unsubscribe from the newsletter.");
                setSuccess(false);
                return;
            }

            const response = await fetch("http://localhost:3000/newsletter", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setMessage("Successfully unsubscribed from the newsletter.");
                setSuccess(true);
                setIsSubscribed(false);
            } else {
                const errorText = await response.text();
                setMessage(errorText || "An error occurred. Please try again.");
                setSuccess(false);
            }
        } catch (error) {
            console.error("Error unsubscribing:", error);
            setMessage("Unable to connect to the server. Please try again later.");
            setSuccess(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="p-6 max-w-md w-full dark:bg-gray-700 shadow-md rounded">
                <h1 className="text-2xl font-bold mb-6 text-center">Newsletter Subscription</h1>
                {isSubscribed === null ? (
                    <p>Loading...</p>
                ) : isSubscribed ? (
                    <>
                        <p className="text-green-500 text-center mb-6">
                            You are already subscribed to the newsletter.
                        </p>
                        <button
                            onClick={handleUnsubscribe}
                            className="bg-red-500  px-4 py-2 w-full rounded"
                        >
                            Unsubscribe
                        </button>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
}