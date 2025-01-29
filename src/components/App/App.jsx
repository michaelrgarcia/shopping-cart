import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../assets/shopping-cart.svg"; // from Lucide
import styles from "./App.module.css";

function App() {
  const itemsInCart = 0; // will be state eventually

  return (
    <>
      <h1>Fake Store</h1>
      <nav className={styles.storeNav}>
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <Link to="shop">
          <button type="button">Shop</button>
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
      <Outlet />
    </>
  );
}

export default App;
