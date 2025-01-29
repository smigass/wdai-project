import Navbar from "./components/Layout/Navbar/Navbar.tsx";
import {Outlet} from "react-router";
import Footer from "./components/Layout/Footer/Footer.tsx";

import {jwtDecode} from "jwt-decode";


export default function Layout() {

    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        if (!decoded) return
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (Date.now() >= decoded.exp * 1000) {
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
        }
        localStorage.setItem('currentUser', JSON.stringify(decoded));
    } else{
        localStorage.removeItem('currentUser');
    }


    return (
        <div id={'app'} className={'font-main dark:text-d-text-primary'}>
            <Navbar />
            <div className={'main-container min-h-[100vh]'}>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}