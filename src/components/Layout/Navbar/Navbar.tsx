import {useEffect, useState} from "react";
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

    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCategories(data)
            })
    }, []);


    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        if (width > 768) {
            setIsMenuOpened(false);
            setIsSearchOpened(false);
        }
    });

    window.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id != 'dropdown-menu' && target.parentElement?.id != 'hamburger-menu') {
            setIsMenuOpened(false);
        }
    })

    const openSearch = () => {
        setIsSearchOpened(prevState => !prevState);
    }

    return (
        <header className={'w-full relative'}>
            <nav
                className={'max-w-container  justify-between flex items-center px-2 h-[3.5rem] md:px-4 lg:px-6'}>
                {/*Left side of navbar*/}
                <div className={'flex'}>
                    <Logo/>
                </div>
                <SearchBar categories={categories}/>

                <SearchMobile categories={categories} opened={isSearchOpened}/>
                {/*Right side of navbar*/}
                <div className={'flex gap-x-12'}>
                    <InlineMenu/>

                    {isMenuOpened ? <DropdownMenu/> : <></>}
                    <ExtraIcons openMenu={() => setIsMenuOpened(!isMenuOpened)} openSearch={openSearch}/>
                </div>
            </nav>
            <LowerNav categories={categories}/>
        </header>
    )
}