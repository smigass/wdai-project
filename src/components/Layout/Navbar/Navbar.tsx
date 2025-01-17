import {useState} from "react";
import Logo from "./Logo.tsx";
import InlineMenu from "./InlineMenu.tsx";
import DropdownMenu from "./DropdownMenu.tsx";
import ExtraIcons from "./ExtraIcons.tsx";
import SearchBar from "./SearchBar.tsx";
import LowerNav from "./LowerNav.tsx";
import Category from "../../../interfaces/Category.ts";

const categories1: Category[] = [
    {
        id: 1,
        name: 'Category 1'
    },
    {
        id: 2,
        name: 'Category 2'
    },
    {
        id: 3,
        name: 'Category 3'
    },
    {
        id: 4,
        name: 'Category 4'
    },
    {
        id: 5,
        name: 'Category 5'
    },
    {
        id: 6,
        name: 'Category 6'
    },
    {
        id: 7,
        name: 'Category 7'
    },
]

export default function Navbar() {

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const [categories, setCategories] = useState<Category[]>(categories1);



    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        if (width > 768) {
            setIsMenuOpened(false);
        }
    });

    window.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id != 'dropdown-menu' && target.parentElement?.id != 'hamburger-menu') {
            setIsMenuOpened(false);
        }
    })

    return (
        <header className={'w-full relative'}>
            <nav
                className={'max-w-container  justify-between flex items-center px-2 h-[3.5rem] md:px-4 lg:px-6'}>
                {/*Left side of navbar*/}
                <div className={'flex'}>
                    <Logo/>
                </div>
                <SearchBar categories={categories}/>

                {/*Right side of navbar*/}
                <div className={'flex gap-x-12'}>
                    <InlineMenu/>

                    {isMenuOpened ? <DropdownMenu/> : <></>}
                    <ExtraIcons openMenu={() => setIsMenuOpened(!isMenuOpened)}/>
                </div>
            </nav>
            <LowerNav categories={categories}/>
        </header>
    )
}