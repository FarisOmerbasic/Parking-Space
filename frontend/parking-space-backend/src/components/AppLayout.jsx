import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-smash-gray flex flex-col">
      <Sidebar />
      <main className="flex-grow container mx-auto px-4 py-6 md:px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
