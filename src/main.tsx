import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./Layout.tsx";
import App from "./pages/HomePage.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />} >
                <Route path={'/'} element={<App/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)
