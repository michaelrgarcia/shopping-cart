import { Link } from "react-router-dom";

import CartIcon from "../../assets/shopping-cart.svg"; // from Lucide
import styles from "./App.module.css";

function App() {
  return (
    <>
      <h1>Fake Store</h1>
      <nav>
        <button type="button">Home</button>
        <button type="button">Shop</button>
        <button type="button">
          <img src={CartIcon} className={styles.cartIcon} alt="Cart" />
        </button>
      </nav>
    </>
  );
}

export default App;
