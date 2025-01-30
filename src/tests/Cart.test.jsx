import { describe, it, expect } from "vitest";
import { getDefaultNormalizer, render, screen } from "@testing-library/react";

import RenderRouteWithOutletContext from "../utils/RenderRouteWithOutletContext.jsx";
import Cart from "../components/CartComponents/Cart/Cart.jsx";

const exampleData = [
  {
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    amount: 1,
  },
  {
    id: 2,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    price: 22.3,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    amount: 1,
  },
  {
    id: 3,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    price: 55.99,
    title: "Mens Cotton Jacket",
    amount: 1,
  },
];

describe("handles fake store api data", () => {
  it("renders the data correctly", () => {
    const mockContext = { cart: exampleData };

    render(
      <RenderRouteWithOutletContext context={mockContext}>
        <Cart />
      </RenderRouteWithOutletContext>
    );

    for (let i = 0; i < exampleData.length; i++) {
      const { title, price } = exampleData[i];

      expect(
        screen.getByText(title, {
          normalizer: getDefaultNormalizer({ trim: false }),
        })
      ).toBeInTheDocument();

      expect(
        screen.getByText("$" + price.toFixed(2), {
          normalizer: getDefaultNormalizer({ trim: false }),
        })
      ).toBeInTheDocument();

      // cart item img
      expect(
        screen.getByAltText(title, {
          normalizer: getDefaultNormalizer({ trim: false }),
        })
      ).toBeInTheDocument();
    }
  });
});
