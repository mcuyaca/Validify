import { createBrowserRouter } from "react-router-dom";
import Login from "./page/Login";

import Validation from "./page/Validation";
import UserLayout from "./layout/UserLayout";
import Upload from "./page/Upload";

export const router = createBrowserRouter([
  {
    id: "app",
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Upload />,
      },
      {
        path: "validation",
        element: <Validation />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
