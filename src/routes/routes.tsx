import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Products from "../pages/products/Products";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import AddProduct from "../pages/addProduct/AddProduct";
import SellerRoutes from "./SellerRoutes";
import MyProduct from "../pages/myProduct/MyProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "add-product",
        element: (
          <SellerRoutes>
            <AddProduct />
          </SellerRoutes>
        ),
      },
      {
        path: "my-product",
        element: (
          <SellerRoutes>
            <MyProduct />
          </SellerRoutes>
        ),
      },
    ],
  },
]);
