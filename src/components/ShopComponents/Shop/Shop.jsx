import { useOutletContext } from "react-router-dom";
import { useMemo } from "react";

import ShopItem from "../ShopItem/ShopItem.jsx";

import styles from "./Shop.module.css";

const Shop = () => {
  const { shopItems } = useOutletContext();

  const renderedItems = useMemo(() => {
    return shopItems.map((shopItem) => (
      <ShopItem key={shopItem.id} shopItemObj={shopItem} />
    ));
  }, [shopItems]);

  return (
    <main>
      <h2>Shop</h2>
      <div className={styles.shopItems}>{renderedItems}</div>
    </main>
  );
};

export default Shop;
