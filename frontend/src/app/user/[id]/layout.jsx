import React from "react";
import ProfilePage from "./profile/page";
import SettingsPage from "./settings/page";

const UserLayout = () => {
  return (
    <div>
      <ProfilePage />
      <SettingsPage />
    </div>
  );
};

export default UserLayout;
