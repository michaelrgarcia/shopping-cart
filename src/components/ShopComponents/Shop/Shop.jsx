// shopitem component key will be "id" in shopItem object

import { useOutletContext } from "react-router-dom";
import ShopItem from "../ShopItem/ShopItem";
import { useMemo } from "react";

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
      <div className="shopItems">{renderedItems}</div>
    </main>
  );
};

export default Shop;
