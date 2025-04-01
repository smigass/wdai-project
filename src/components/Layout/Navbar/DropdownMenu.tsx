import MenuLinks from "./MenuLinks.tsx";

export default function DropdownMenu() {
    return (
        <div
            id={'dropdown-menu'}
            className={'absolute right-[5px] top-[65px] bg-white dark:bg-d-secondary border rounded-lg border-d-text-secondary dark:bg-d-secondary p-4'}>
            <ul className={'flex flex-col items-center'}>
                <MenuLinks/>
            </ul>
        </div>
    )
}