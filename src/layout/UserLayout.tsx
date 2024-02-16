import { authProvider } from "@/service/auth";
import { Outlet, redirect } from "react-router-dom";
import Header from "@/components/Header";

async function loader({ request }: { request: Request }) {
  if (!authProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  return {};
}

function UserLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex min-w-full max-w-[1444px] flex-col items-center">
        <Header />
        <div
          style={{ height: "calc(100vh - 4rem)" }}
          className=" w-full max-w-[1444px] px-10  "
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

UserLayout.loader = loader;
export default UserLayout;
