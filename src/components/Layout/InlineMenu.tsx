import MenuLinks from "./MenuLinks.tsx";

export default function InlineMenu() {
    return (
        <ul className={'hidden md:flex'}>
            <MenuLinks/>
        </ul>
    )
}