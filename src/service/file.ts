import { URL_BASE } from "@/constans";
import { authProvider } from "./auth";
import { redirect } from "react-router-dom";

export async function sendFile(file: FormData) {
  const url = `${URL_BASE}/upload`;
  const token = authProvider.token;

  const options = {
    method: "POST",
    body: file,
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    localStorage.setItem("data", JSON.stringify(body));
    return body.data;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}