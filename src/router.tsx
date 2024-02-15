import { createBrowserRouter } from "react-router-dom";

import Simple from "./layout/BasicLoyout";
import Login from "./page/Login";

import Validation from "./page/Validation";
import UserLayout from "./layout/UserLayout";

export const router = createBrowserRouter([
  {
    id: "app",
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Validation />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
