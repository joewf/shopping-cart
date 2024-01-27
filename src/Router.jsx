import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";
import About from "./About"
// import NavigationBar from "./Navigation";
import Home from "./Home";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import ShoppingCart from "./Cart";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/home",
            element: <Home />,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/products",
            element: <Products />,
        },
        {
            path: "/products/:id",
            element: <ProductDetails />
        },
        {
            path: "/cart",
            element: <ShoppingCart />
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;