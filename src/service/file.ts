import { URL_BASE } from "@/constans";
import { authProvider } from "./auth";
import { redirect } from "react-router-dom";
import { Data } from "@/models/file";

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

export async function sendRecord(data: Data) {
  const url = `${URL_BASE}/signup`;
  const token = authProvider.token;

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  console.log(options);
  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.data;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  if (response.status === 400) {
    const error = await response.json();
    console.log(error.error);
    throw new Error(error.error.message);
  }

  console.log("pase la valida");
  const body = await response.json();
  return Promise.reject(new Error(body.error));
}
