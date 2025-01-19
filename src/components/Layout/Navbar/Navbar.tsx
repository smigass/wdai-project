import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { FaUserAlt } from "react-icons/fa";
import Logo from "./Logo.tsx";
import InlineMenu from "./InlineMenu.tsx";
import DropdownMenu from "./DropdownMenu.tsx";
import ExtraIcons from "./ExtraIcons.tsx";
import SearchBar from "./SearchBar.tsx";
import LowerNav from "./LowerNav.tsx";
import Category from "../../../interfaces/Category.ts";
import SearchMobile from "./SearchMobile.tsx";

export default function Navbar() {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isSearchOpened, setIsSearchOpened] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const { user } = useContext(UserContext); // Get user data from context
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data));
    }, []);

    const handleAccountClick = () => {
        if (user) {
            navigate("/account");
        } else {
            navigate("/login");
        }
    };


    const openSearch = () => {
        setIsSearchOpened((prevState) => !prevState);
    };

    return (
        <header className="w-full relative">
            <nav className="max-w-container justify-between flex items-center px-2 h-[3.5rem] md:px-4 lg:px-6">
                {/* Left side */}
                <div className="flex">
                    <Logo />
                </div>
                <SearchBar categories={categories} />
                <SearchMobile categories={categories} opened={isSearchOpened} />
                {/* Right side */}
                <div className="flex items-center gap-x-5 z-20  pl-10 h-fit self-center">
                    <InlineMenu />
                    {isMenuOpened ? <DropdownMenu /> : <></>}
                    <ExtraIcons openMenu={() => setIsMenuOpened(!isMenuOpened)} openSearch={openSearch} />
                    {/* Render the account button only if the user is logged in */}
                    {user && (
                        <div
                            onClick={handleAccountClick}
                            className="p-1 border border-d-text-secondary text-sm rounded-md dark:text-d-text-primary flex items-center gap-x-2"
                        > <FaUserAlt size={18} />
                        </div>
                    )}
                </div>
            </nav>
            <LowerNav categories={categories} />
        </header>
    );
}