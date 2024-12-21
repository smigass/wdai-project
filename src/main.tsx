import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./Layout.tsx";
import App from "./pages/HomePage.tsx";

let root = ""
// Uncomment this line to deploy to GitHub Pages
//root = "wdai-project/"

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />} >
                <Route path={'/' + root} element={<App/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)
