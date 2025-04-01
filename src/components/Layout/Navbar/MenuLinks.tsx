import {Link} from "react-router";

export default function MenuLinks() {
    return (
        <>
            <Link to={'/products'}>
                <li className={'p-4 cursor-pointer hover:underline underline-offset-4'}>Products</li>
            </Link>
            <Link to={'/about'}>
                <li className={'p-4 cursor-pointer hover:underline underline-offset-4'}>About us</li>
            </Link>
            <Link to={'/orders'}>
                <li className={'p-4 cursor-pointer hover:underline underline-offset-4'}>Orders</li>
            </Link>
        </>
    )
}