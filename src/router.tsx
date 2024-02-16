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
    loader: UserLayout.loader,
    children: [
      {
        index: true,
        element: <Upload />,
        loader: Upload.loader,
        action: Upload.action,
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
    action: Login.action,
  },
]);
