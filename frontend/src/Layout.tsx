import { Outlet, ScrollRestoration } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <main className="flex-1 flex justify-center items-center my-6">
        <ScrollRestoration />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;