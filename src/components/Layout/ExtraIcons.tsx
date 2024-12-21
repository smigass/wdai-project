import HamburgerMenu from "./HamburgerMenu.tsx";
import LoginButton from "./LoginButton.tsx";
import {MdLightMode} from "react-icons/md";

interface props {
    openMenu: () => void
}

const changeTheme = () => {
    const dark = localStorage.getItem('dark');
    const html = document.querySelector('html')!;
    if (!dark) {
        localStorage.setItem('dark', 'true');
        html.classList.add('dark');
        return
    }
    if (dark === 'true') {
        localStorage.setItem('dark', 'false');
        html.classList.remove('dark');
        return
    }
    localStorage.setItem('dark', 'true');
    html.classList.add('dark');
}

export default function ExtraIcons({openMenu}: props) {
    return (
        <div className={'flex items-center gap-x-5 md:border-l pl-10 h-fit self-center'}>
            <HamburgerMenu openMenu={openMenu}/>
            <LoginButton/>
            <div
                className={'h-fit p-1 border border-d-text-secondary rounded-md cursor-cell dark:text-d-text-primary'}
                onClick={changeTheme}>
                <MdLightMode size={18} color={'currentColor'}/>
            </div>
        </div>
    )
}