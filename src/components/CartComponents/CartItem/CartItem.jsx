import { useOutletContext } from "react-router-dom";

import PropTypes from "prop-types";

import styles from "./CartItem.module.css";

const CartItem = ({ cartItemObj }) => {
  const { onCartRemove } = useOutletContext();

  return (
    <div className={styles.cartItem}>
      <img src={cartItemObj.image} alt={cartItemObj.title} />
      <div className={styles.cartItemInfo}>
        <p className={styles.cartItemTitle}>{cartItemObj.title}</p>
        <p className={styles.cartItemAmount}>Amount: {cartItemObj.amount}</p>
      </div>
      <div className={styles.cartRemovalSection}>
        <p className={styles.cartItemPrice}>${cartItemObj.price}</p>
        <button
          type="button"
          onClick={() => onCartRemove(cartItemObj)}
          className={styles.removeCartItem}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  cartItemObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
