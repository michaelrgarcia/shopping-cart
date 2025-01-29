import App from "./components/App/App.jsx";
import Home from "./components/HomeComponents/Home/Home.jsx";
import Shop from "./components/ShopComponents/Shop/Shop.jsx";
import Cart from "./components/CartComponents/Cart/Cart.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;
