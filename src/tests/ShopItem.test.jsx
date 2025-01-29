import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";

import userEvent from "@testing-library/user-event";

import ShopItem from "../components/ShopComponents/ShopItem/ShopItem.jsx";
import PropTypes from "prop-types";

const sampleShopItem = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

const RenderRouteWithOutletContext = ({ context, children }) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Outlet context={context} />}>
          <Route index element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

RenderRouteWithOutletContext.propTypes = {
  context: PropTypes.any,
  children: PropTypes.any,
};

describe("item control functionality", () => {
  it("increments once", async () => {
    const user = userEvent.setup();
    const mockContext = { onCartAdd: (item) => item };

    render(
      <RenderRouteWithOutletContext context={mockContext}>
        <ShopItem shopItemObj={sampleShopItem} />
      </RenderRouteWithOutletContext>
    );

    const incrementBtn = screen.getByRole("button", { name: "+" });

    await user.click(incrementBtn);

    expect(screen.getByDisplayValue(2)).toBeVisible();
  });

  it("decrements once", async () => {
    const user = userEvent.setup();
    const mockContext = { onCartAdd: (item) => item };

    render(
      <RenderRouteWithOutletContext context={mockContext}>
        <ShopItem shopItemObj={sampleShopItem} />
      </RenderRouteWithOutletContext>
    );

    const incrementBtn = screen.getByRole("button", { name: "+" });
    const decrementBtn = screen.getByRole("button", { name: "-" });

    await user.click(incrementBtn);

    expect(screen.getByDisplayValue(2)).toBeVisible();

    await user.click(decrementBtn);

    expect(screen.getByDisplayValue(1)).toBeVisible();
  });

  it("doesn't increment past 9", async () => {
    const user = userEvent.setup();
    const mockContext = { onCartAdd: (item) => item };

    render(
      <RenderRouteWithOutletContext context={mockContext}>
        <ShopItem shopItemObj={sampleShopItem} />
      </RenderRouteWithOutletContext>
    );

    const incrementBtn = screen.getByRole("button", { name: "+" });

    // starts at 1...

    await user.tripleClick(incrementBtn);
    await user.tripleClick(incrementBtn);
    await user.tripleClick(incrementBtn);

    // should be 10, but state shouldn't update past that

    expect(screen.getByDisplayValue(9)).toBeVisible();
  });

  it("doesn't decrement below 1", async () => {
    const user = userEvent.setup();
    const mockContext = { onCartAdd: (item) => item };

    render(
      <RenderRouteWithOutletContext context={mockContext}>
        <ShopItem shopItemObj={sampleShopItem} />
      </RenderRouteWithOutletContext>
    );

    const decrementBtn = screen.getByRole("button", { name: "-" });

    // starts at 1...

    await user.tripleClick(decrementBtn);

    expect(screen.getByDisplayValue(1)).toBeVisible();
  });

  // add to cart tests will be done after cart page is done
});
