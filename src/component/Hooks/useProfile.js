import { useState } from 'react';

export default function useProfile() {
  const getProfile= () => {
    const profileString = localStorage.getItem('profile');
    const profile = JSON.parse(profileString);
    return profile?.profile
  };

  const [profile, setProfile] = useState(getProfile());

  const saveProfile = userProfile => {
    localStorage.setItem('profile', JSON.stringify(userProfile));
    setProfile(userProfile.profile);
  };

  return {
    setProfile: saveProfile,
    profile
  }
}