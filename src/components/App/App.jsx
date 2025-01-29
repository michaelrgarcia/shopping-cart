import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../assets/shopping-cart.svg"; // from Lucide
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [shopItems, setShopItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setShopItems(json))
      .catch((err) => console.error(err));
  }, []);

  function onCartAdd(item) {
    for (let i = 0; i < cart.length; i++) {
      const currentCartItem = cart[i];

      if (Number(currentCartItem.id) === Number(item.id)) {
        const cartCopy = [...cart];

        cartCopy[i].amount += item.amount;

        setCart(cartCopy);
      } else {
        setCart([...cart, item]);
      }
    }
  }

  function onCartRemove(item) {
    const cartItemIndex = cart.indexOf(item);

    if (cartItemIndex !== -1) {
      const cartCopy = [...cart];
      cartCopy.splice(cartItemIndex, 1);

      setCart(cartCopy);
    }
  }

  const shopContext = {
    shopItems,
    cart,
    onCartAdd,
    onCartRemove,
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
              alt={`Cart ${cart.length} items`}
              title={`Cart ${cart.length} items`}
            />
          </button>
        </Link>
      </nav>
      <Outlet context={shopContext} />
    </>
  );
}

export default App;
