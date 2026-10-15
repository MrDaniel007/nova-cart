import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";
import AdminRoute from "./components/AdminRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
            path: "/",
            element: <Home />,
        },
        { 
          path: "admin",
          element: <AdminRoute><Admin /></AdminRoute>,
        },
        {
          path: "product",
          element: <Product />,
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "product/:id",
          element: <ProductDetail />
        },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "wishlist",
          element: <Wishlist />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "account",
          element: <Account />
        }
      ]
    }

])