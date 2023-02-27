// npm modules
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// types
import { Profile } from "../../types/models";
import { ProfileProps } from "../../types/props";

// services
import * as profileService from '../../services/profileService'

// components
import ListingCard from "../../components/ListingCard/ListingCard";

const ProfilePage = (props: ProfileProps) => {
  const { user, handleLogout } = props

  const [profile, setProfile] = useState<Profile>({
    name: "",
    userName: "",
    email: '',
    photo: "",
    id: 0,
    createdAt: "",
    updatedAt: "",
    listings: []
  })

  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfile(user!.profile.id)
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [user])

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-btns">
        <button id="log-out" onClick={handleLogout}>Log Out</button>
        <Link id="change-password" to="/change-password">Change Password</Link>
      </div>
      <img src={profile.photo} alt="" />
      <h2>Name: {profile.name}</h2>
      <h2>UserName: {profile.userName}</h2>
      <h3>Listings</h3>
      {profile.listings.map(listing =>
        <ListingCard listing={listing} key={listing.itemName} />
      )}
    </div>
  );
}

export default ProfilePage;