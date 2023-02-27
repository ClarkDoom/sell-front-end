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
        const profileData: Profile = await profileService.getProfile(user.profile.id)
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [user])

  return (
    <>
      <h1>Profile Component</h1>
      <button onClick={handleLogout}>Log Out</button>
      
      <Link to="/change-password"><button>Change Password</button></Link>
      <p>{profile.name}</p>
      <p>{profile.userName}</p>
      <h2>Listings</h2>
      {profile.listings.map(listing =>
        <ListingCard listing={listing} key={listing.itemName}/>
      )}
    </>
  );
}

export default ProfilePage;