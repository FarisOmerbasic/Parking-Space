import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
Sidebar
function AppLayout() {
  return (
    <div className="min-h-screen bg-smash-gray flex flex-col">
      <Sidebar />
      <main className="pl-56 flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
