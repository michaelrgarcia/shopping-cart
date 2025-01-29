import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import CartItem from "../CartItem/CartItem.jsx";

import styles from "./Cart.module.css";

function Cart() {
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
    </main>
  );
}

export default Cart;
