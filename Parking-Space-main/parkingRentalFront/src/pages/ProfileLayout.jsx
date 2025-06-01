import { Outlet } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";

function ProfileLayout() {
  return (
    <div className="w-full">
      <ProfileHeader />
      <main className="mt-4">
        <Outlet />
      </main>
    </div>
  );
}

export default ProfileLayout;
