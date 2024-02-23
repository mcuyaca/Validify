import { describe, it } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Login from "../page/Login";

describe("Login Component", () => {
  it("should render login form", async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Route path="/login" component={Login} />
      </MemoryRouter>,
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const loginButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);
  });
});
