import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateInputs = () => {
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError("Invalid email format.");
            return false;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        if (!formData.phone.match(/^\d{9,15}$/)) {
            setError("Phone number must be 9-15 digits long.");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        setError(null);
        if (!validateInputs()) return;

        try {
            const response = await fetch("http://localhost:3000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Account created successfully!");
                navigate("/login");
            } else {
                const result = await response.text();
                setError(result || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error registering:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="p-6 max-w-md w-full bg-white shadow-md rounded">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full p-2 border mb-4 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full p-2 border mb-4 rounded"
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full p-2 border mb-4 rounded"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full p-2 border mb-4 rounded"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="block w-full p-2 border mb-4 rounded"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full p-2 border mb-4 rounded"
                />
                <button
                    onClick={handleRegister}
                    className="bg-blue-500 text-white px-4 py-2 w-full rounded"
                >
                    Register
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <p
                    className="text-blue-500 text-center mt-4 cursor-pointer"
                    onClick={() => navigate("/login")}
                >
                    Already have an account? Log in here
                </p>
            </div>
        </div>
    );
}




