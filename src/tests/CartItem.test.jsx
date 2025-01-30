import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import RenderRouteWithOutletContext from "../utils/RenderRouteWithOutletContext.jsx";

import Cart from "../components/CartComponents/Cart/Cart.jsx";

const sampleCartItem = {
  id: 1,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  price: 109.95,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  amount: 1,
};

describe("cart item control(s)", () => {
  it("deletes an item from the cart", async () => {
    const user = userEvent.setup();
    const mockContext = {
      cart: [sampleCartItem],
    };

    const onCartRemove = (item) => {
      const { cart } = mockContext;
      const cartItemIndex = cart.indexOf(item);

      if (cartItemIndex !== -1) {
        const cartCopy = [...cart];
        cartCopy.splice(cartItemIndex, 1);

        mockContext.cart = cartCopy;
      }
    };

    mockContext.onCartRemove = onCartRemove;

    const { rerender } = render(
      <RenderRouteWithOutletContext context={mockContext}>
        <Cart />
      </RenderRouteWithOutletContext>
    );

    const removeBtn = screen.getByRole("button", { name: "Remove" });

    await user.click(removeBtn);

    rerender(
      <RenderRouteWithOutletContext context={mockContext}>
        <Cart />
      </RenderRouteWithOutletContext>
    );

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});
