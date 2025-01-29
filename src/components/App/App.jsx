import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../assets/shopping-cart.svg"; // from Lucide
import styles from "./App.module.css";
import { useEffect, useState } from "react";

const App = () => {
  const [shopItems, setShopItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setShopItems(json))
      .catch((err) => console.error(err));
  }, []);

  const onCartAdd = (item) => {
    const dupeIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (dupeIndex !== -1) {
      const cartCopy = [...cart];

      cartCopy[dupeIndex].amount += item.amount;

      setCart(cartCopy);
    } else {
      setCart([...cart, item]);
    }
  };

  const onCartRemove = (item) => {
    const cartItemIndex = cart.indexOf(item);

    if (cartItemIndex !== -1) {
      const cartCopy = [...cart];
      cartCopy.splice(cartItemIndex, 1);

      setCart(cartCopy);
    }
  };

  const shopContext = {
    shopItems,
    cart,
    onCartAdd,
    onCartRemove,
  };

  const itemsInCart = cart.reduce(
    (accumulator, { amount }) => accumulator + amount,
    0
  );

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
};

export default App;
