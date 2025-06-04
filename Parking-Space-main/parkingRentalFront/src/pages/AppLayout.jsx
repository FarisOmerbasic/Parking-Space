import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;