import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
    email: string;
    userId: number;
    role: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Pobierz token z localStorage
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split(".")[1])); // Dekodowanie JWT
                const { email, userId, role } = decoded;
                setUser({ email, userId, role }); // Ustawienie użytkownika w kontekście
            } catch (error) {
                console.error("Failed to parse token:", error);
            }
        }
    }, []); // Wywołane tylko raz przy starcie aplikacji


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};