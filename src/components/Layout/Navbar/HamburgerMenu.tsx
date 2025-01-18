import { IoMenu } from "react-icons/io5";

interface HamburgerMenuProps {
    openMenu: () => void
}

export default function HamburgerMenu({openMenu}: HamburgerMenuProps) {
    return (
        <div className={'md:hidden z-10 p-1 border rounded-md border-d-text-secondary'} id={'hamburger-menu'} onClick={openMenu}>
            <IoMenu size={18} color={'currentColor'}/>
        </div>
    )
}