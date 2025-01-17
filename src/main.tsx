import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";

let root = ""
// Uncomment this line to deploy to GitHub Pages
//root = "wdai-project/"

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path={'/' + root} element={<Layout/>}>
                <Route index element={<Home/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)
