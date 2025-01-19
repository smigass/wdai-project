import { createRoot } from "react-dom/client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import ProductInfo from "./pages/ProductInfo.tsx";
import Products from "./pages/Products.tsx";
import About from "./pages/About.tsx";
import LoginPage from "./components/Auth/LoginPage.tsx";
import RegisterPage from "./components/Auth/RegisterPage.tsx";

let root = "";
// Uncomment this line to deploy to GitHub Pages
// root = "wdai-project/";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            {/* Wszystkie trasy przechodzą przez Layout */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="cart" element={<div>Cart Page</div>} />
                <Route path="product/:id" element={<ProductInfo />} />
                <Route path="products" element={<Products />} />
                <Route path="about" element={<About />} />
                {/* Trasy logowania i rejestracji */}
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
