import { Form, redirect } from "react-router-dom";
import { Button } from "./ui/button";
import { authProvider } from "@/service/auth";

async function loader({ request }: { request: Request }) {
  if (!authProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  if (!localStorage.getItem("data")) {
    return redirect("/validation");
  }
  return {};
}

function Header() {
  return (
    <header className="sticky left-0 right-0 top-0 z-10 flex h-16 w-full max-w-[1444px] items-center justify-between border-b bg-background px-10">
      <h1
        className="inline-block bg-gradient-to-r from-purple-700  to-blue-700 bg-clip-text
 font-logo text-4xl font-bold leading-tight tracking-tighter text-transparent"
      >
        Validify
      </h1>
      <Form method="POST" action="/logout">
        <Button variant="outline">Logout</Button>
      </Form>
    </header>
  );
}

Header.loader = loader;
export default Header;
