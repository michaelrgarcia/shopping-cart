import { describe, it, expect } from "vitest";
import { getDefaultNormalizer, render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import RenderRouteWithOutletContext from "../utils/RenderRouteWithOutletContext.jsx";

import ShopItem from "../components/ShopComponents/ShopItem/ShopItem.jsx";
import Cart from "../components/CartComponents/Cart/Cart.jsx";

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

  it("adds 1 item to the cart", async () => {
    const user = userEvent.setup();

    const mockContext = { cart: [] };

    const onCartAdd = (item) => {
      const { cart } = mockContext;

      const dupeIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

      if (dupeIndex !== -1) {
        const cartCopy = [...cart];

        cartCopy[dupeIndex].amount += item.amount;

        mockContext.cart = cartCopy;
      } else {
        mockContext.cart = [...cart, item];
      }
    };

    mockContext.onCartAdd = onCartAdd;

    render(
      <RenderRouteWithOutletContext context={mockContext}>
        <ShopItem shopItemObj={sampleShopItem} />
      </RenderRouteWithOutletContext>
    );

    const addBtn = screen.getByRole("button", { name: "Add to cart" });

    await user.click(addBtn);

    render(
      <RenderRouteWithOutletContext context={mockContext}>
        <Cart />
      </RenderRouteWithOutletContext>
    );

    expect(
      screen.getByText("Amount: 1", {
        normalizer: getDefaultNormalizer({ trim: false }),
      })
    ).toBeInTheDocument();
  });

  it("adds 3 items to the cart", async () => {
    const user = userEvent.setup();

    const mockContext = { cart: [] };

    const onCartAdd = (item) => {
      const { cart } = mockContext;

      const dupeIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

      if (dupeIndex !== -1) {
        const cartCopy = [...cart];

        cartCopy[dupeIndex].amount += item.amount;

        mockContext.cart = cartCopy;
      } else {
        mockContext.cart = [...cart, item];
      }
    };

    mockContext.onCartAdd = onCartAdd;

    render(
      <RenderRouteWithOutletContext context={mockContext}>
        <ShopItem shopItemObj={sampleShopItem} />
      </RenderRouteWithOutletContext>
    );

    const incrementBtn = screen.getByRole("button", { name: "+" });
    const addBtn = screen.getByRole("button", { name: "Add to cart" });

    await user.dblClick(incrementBtn);

    expect(screen.getByDisplayValue(3)).toBeVisible();

    await user.click(addBtn);

    render(
      <RenderRouteWithOutletContext context={mockContext}>
        <Cart />
      </RenderRouteWithOutletContext>
    );

    expect(
      screen.getByText("Amount: 3", {
        normalizer: getDefaultNormalizer({ trim: false }),
      })
    ).toBeInTheDocument();
  });

  it("adds amount to an existing item", async () => {
    const user = userEvent.setup();

    const mockContext = { cart: [] };

    const onCartAdd = (item) => {
      const { cart } = mockContext;

      const dupeIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

      if (dupeIndex !== -1) {
        const cartCopy = [...cart];

        cartCopy[dupeIndex].amount += item.amount;

        mockContext.cart = cartCopy;
      } else {
        mockContext.cart = [...cart, item];
      }
    };

    mockContext.onCartAdd = onCartAdd;

    render(
      <RenderRouteWithOutletContext context={mockContext}>
        <ShopItem shopItemObj={sampleShopItem} />
      </RenderRouteWithOutletContext>
    );

    const addBtn = screen.getByRole("button", { name: "Add to cart" });

    await user.click(addBtn);

    const { rerender } = render(
      <RenderRouteWithOutletContext context={mockContext}>
        <Cart />
      </RenderRouteWithOutletContext>
    );

    expect(
      screen.getByText("Amount: 1", {
        normalizer: getDefaultNormalizer({ trim: false }),
      })
    ).toBeInTheDocument();

    await user.click(addBtn);

    rerender(
      <RenderRouteWithOutletContext context={mockContext}>
        <Cart />
      </RenderRouteWithOutletContext>
    );

    expect(
      screen.getByText("Amount: 2", {
        normalizer: getDefaultNormalizer({ trim: false }),
      })
    ).toBeInTheDocument();
  });
});
