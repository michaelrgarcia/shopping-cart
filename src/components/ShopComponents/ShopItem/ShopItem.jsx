import PropTypes from "prop-types";

import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import styles from "./ShopItem.module.css";

const ShopItem = ({ shopItemObj }) => {
  const [numberToAdd, setNumberToAdd] = useState(1);

  const { onCartAdd } = useOutletContext();

  const { id, image, price, title } = shopItemObj;

  const cartItemObj = {
    id,
    image,
    price,
    title,
    amount: numberToAdd,
  };

  function incrementNumToAdd() {
    if (numberToAdd !== 9) {
      setNumberToAdd(numberToAdd + 1);
    }
  }

  function decrementNumToAdd() {
    if (numberToAdd !== 1) {
      setNumberToAdd(numberToAdd - 1);
    }
  }

  return (
    <div className={styles.shopItem}>
      <img src={shopItemObj.image} alt={shopItemObj.description} />
      <p className={styles.shopItemTitle}>{shopItemObj.title}</p>
      <p className={styles.shopItemPrice}>${shopItemObj.price.toFixed(2)}</p>
      <div className={styles.userControls}>
        <div className={styles.itemCounter}>
          <button
            type="button"
            onClick={decrementNumToAdd}
            className={styles.decrementCounter}
          >
            -
          </button>
          <input
            type="tel"
            min={1}
            max={9}
            name={`item-counter-${shopItemObj.id}`}
            value={numberToAdd}
            onChange={(e) => setNumberToAdd(e.target.value)}
          />
          <button
            type="button"
            onClick={incrementNumToAdd}
            className={styles.incrementCounter}
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => onCartAdd(cartItemObj)}
          className={styles.addToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

ShopItem.propTypes = {
  shopItemObj: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShopItem;
