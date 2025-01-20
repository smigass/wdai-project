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
import NewsletterPage from "./components/Newsletter/NewsletterPage.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import Cart from "./pages/Cart.tsx";

let root = "";
// Uncomment this line to deploy to GitHub Pages
// root = "wdai-project/";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        {/* Wszystkie trasy przechodzą przez Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="cart" element={<Cart/>} />
          <Route path="product/:id" element={<ProductInfo />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          {/* Trasy logowania i rejestracji */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path={'account'} element={<AccountPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
