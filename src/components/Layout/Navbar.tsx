import {useState} from "react";
import Logo from "./Logo.tsx";
import InlineMenu from "./InlineMenu.tsx";
import DropdownMenu from "./DropdownMenu.tsx";
import ExtraIcons from "./ExtraIcons.tsx";

export default function Navbar() {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        if (width > 768) {
            setIsMenuOpened(false);
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target?.id != 'dropdown-menu' && e.target?.parentElement?.id != 'hamburger-menu') {
            setIsMenuOpened(false);
        }
    })

    return (
        <header className={'w-full relative'}>
            <nav
                className={'max-w-container justify-between flex items-center px-2 h-[3.5rem]   md:px-4 lg:px-6'}>
                {/*Left side of navbar*/}
                <div className={'flex'}>
                    <Logo/>
                </div>


                {/*Right side of navbar*/}
                <div className={'flex gap-x-12'}>
                    <InlineMenu/>

                    {isMenuOpened ? <DropdownMenu/> : <></>}
                    <ExtraIcons openMenu={() => setIsMenuOpened(!isMenuOpened)}/>
                </div>
                {/*                      */}
            </nav>
        </header>
    )
}