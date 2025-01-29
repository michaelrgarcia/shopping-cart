import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../assets/shopping-cart.svg"; // from Lucide
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setShopItems(json))
      .catch((err) => console.error(err));
  }, []);

  const itemsInCart = 0; // will be state eventually

  const shopContext = {
    shopItems,
  };

  return (
    <>
      <h1>Fake Store</h1>
      <nav className={styles.storeNav}>
        <Link to="/">
          <button className={styles.navButton} type="button">
            Home
          </button>
        </Link>
        <Link to="shop">
          <button type="button" className={styles.navButton}>
            Shop
          </button>
        </Link>
        <Link to="cart">
          <button type="button" className={styles.toggleCart}>
            <img
              src={CartIcon}
              className={styles.cartIcon}
              alt={`Cart ${itemsInCart} items`}
              title={`Cart ${itemsInCart} items`}
            />
          </button>
        </Link>
      </nav>
      <Outlet context={shopContext} />
    </>
  );
}

export default App;
