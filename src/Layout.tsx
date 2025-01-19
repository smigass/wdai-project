import Navbar from "./components/Layout/Navbar/Navbar.tsx";
import {Outlet} from "react-router";
import Footer from "./components/Layout/Footer/Footer.tsx";

export default function Layout() {

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