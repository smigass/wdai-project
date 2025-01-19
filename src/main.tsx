import { createRoot } from 'react-dom/client'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import ProductInfo from "./pages/ProductInfo.tsx";
import Products from "./pages/Products.tsx";
import About from "./pages/About.tsx";

let root = ""
// Uncomment this line to deploy to GitHub Pages
//root = "wdai-project/"

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path={'/' + root} element={<Layout/>}>
                <Route index element={<Home/>}/>
            </Route>
            <Route path={'/search'} element={<Layout/>}>
                <Route index element={<Search/>}/>
            </Route>
            <Route path={'/cart'} element={<Layout/>}>
                <Route index element={<></>}/>
            </Route>
            <Route path={'/product/:id'} element={<Layout/>}>
                <Route index element={<ProductInfo/>}/>
            </Route>
            <Route path={'/products'} element={<Layout/>}>
                <Route index element={<Products/>}/>
            </Route>
            <Route path={'/about'} element={<Layout/>}>
                <Route index element={<About/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)
