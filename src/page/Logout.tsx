import { redirect } from "react-router-dom";
import { authProvider } from "../service/auth";

export async function action() {
  authProvider.logout();
  return redirect("/login");
}
