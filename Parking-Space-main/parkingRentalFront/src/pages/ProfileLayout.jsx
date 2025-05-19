import { Outlet } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";

function ProfileLayout() {
  return (
    <>
      <ProfileHeader />
      <main className="">
        <Outlet />
      </main>
</>
  );
}

export default ProfileLayout;
