import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex min-w-full max-w-[1444px] flex-col items-center">
        <header className="sticky left-0 right-0 top-0 z-10 flex h-16 w-full max-w-[1444px] items-center justify-between border-b bg-background px-10">
          <h1
            className="inline-block bg-gradient-to-r from-purple-700  to-blue-700 bg-clip-text
       font-logo text-4xl font-bold leading-tight tracking-tighter text-transparent"
          >
            Validify
          </h1>

          <Button variant="outline">Logout</Button>
        </header>
        <div className="h-screen w-full max-w-[1444px] px-10 pt-16 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
