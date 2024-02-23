import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

describe("Login Component", () => {
  it("should render login form", async () => {
    render(<RouterProvider router={router} />);

    expect(window.location.pathname).toBe("/login");
    const email = document.querySelector("#Email") as HTMLInputElement;
    expect(email.name).toBe("Email");
    const password = document.querySelector("#Password") as HTMLInputElement;
    expect(password.name).toBe("Password");
  });
});
