import { FaUserAlt } from "react-icons/fa";

export default function LoginButton() {
    return (
        <div className={'p-1 border border-d-text-secondary text-sm rounded-md dark:text-d-text-primary flex items-center gap-x-2'}>
            <FaUserAlt size={18} color={'currentColor'}/>
        </div>
    )
}