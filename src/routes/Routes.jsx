import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";

const Home = lazy(() => import("../pages/home/Home"));
const Products = lazy(() => import("../pages/products/Products"));
const ProductsDetails = lazy(() => import("../pages/products/ProductsDetails"));
const Blog = lazy(() => import("../pages/blog/Blog"));
const Review = lazy(() => import("../pages/review/Review"));

// Legal pages
const TermsAndConditions = lazy(() => import("../pages/legal/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("../pages/legal/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("../pages/legal/CookiePolicy"));

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
        path: "ইসরায়েলের-পন্যগুলো",
        element: <Products />,
      },
      {
        path: "ইসরায়েলের-পন্যগুলোর-বিস্তারিত/:id",
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
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "cookie-policy",
        element: <CookiePolicy />,
      }
    ],
  },
]);

export default Routes;
