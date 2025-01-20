// FRONTEND/src/pages/Perfil.jsx
import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import UserProfile from '../components/user/UserProfile';

const Profile = () => {
  return (
    <DashboardLayout>
      <UserProfile />
    </DashboardLayout>
  );
};

export default Profile;