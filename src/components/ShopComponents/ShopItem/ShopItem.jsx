import PropTypes from "prop-types";

import styles from "./ShopItem.module.css";
import { useState } from "react";

const ShopItem = ({ shopItemObj }) => {
  // needs an "onCartAdd" prop
  const [numberToAdd, setNumberToAdd] = useState(1);

  return (
    <div className={styles.shopItem}>
      <img src={shopItemObj.image} alt={shopItemObj.description} />
      <p className={styles.shopItemTitle}>{shopItemObj.title}</p>
      <p className={styles.shopItemPrice}>${shopItemObj.price}</p>
      <div className={styles.userControls}>
        <div className={styles.itemCounter}>
          <button type="button" className={styles.decrementCounter}>
            -
          </button>
          <input
            type="tel"
            min={1}
            max={9}
            name={`item-counter-${shopItemObj.id}`}
            value={numberToAdd}
          />
          <button type="button" className={styles.incrementCounter}>
            +
          </button>
        </div>
        <button type="button" className={styles.addToCart}>
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
