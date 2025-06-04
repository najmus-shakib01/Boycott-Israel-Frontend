import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Blog from "../pages/blog/Blog";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import ProductsDetails from "../pages/products/ProductsDetails";
import Review from "../pages/review/Review";
import Visitor from "../pages/visitor/Visitor";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "ইসরায়েলের-পন্যগুলো",
        element: <Products />,
      },
      {
        path: "ইসরায়েলের-পন্যগুলোর-বিস্তারিত/:id",
        element: <ProductsDetails />,
      },
      {
        path: "ব্লগ-ছবি-ও-ভিডিও",
        element: <Blog />,
      },
      {
        path: "আপনার-মতামত",
        element: <Review />,
      },
      {
        path: "ওয়েবসাইট-ভিজিট-কাউন্ট",
        element: <Visitor />,
      },
    ],
  },
]);

export default Routes;
