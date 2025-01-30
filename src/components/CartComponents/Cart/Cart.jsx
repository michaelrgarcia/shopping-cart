import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import CartItem from "../CartItem/CartItem.jsx";

import styles from "./Cart.module.css";

const Cart = () => {
  const { cart } = useOutletContext();

  const renderedItems = useMemo(() => {
    return cart.map((cartItem) => (
      <CartItem key={cartItem.id} cartItemObj={cartItem} />
    ));
  }, [cart]);

  return (
    <main>
      <h2>Cart</h2>
      <div className={styles.cartItems}>
        {cart.length > 0 ? renderedItems : "Your cart is empty."}
      </div>
      {cart.length > 0 ? (
        <p>
          Enjoy looking at how much these things{" "}
          <span className={styles.cartItalics}>would</span> cost you!
        </p>
      ) : (
        ""
      )}
    </main>
  );
};

export default Cart;
