import { useLocation } from "react-router";
import { useState, useEffect } from "react";

// types
import { Profile } from "../../types/models";

// services
import * as profileService from '../../services/profileService'

const ShowListing = () => {
  const location = useLocation()
  const listing = location.state

  const [profile, setProfile] = useState<Profile>({
    name: "",
    userName: "",
    photo: "",
    id: 0,
    createdAt: "",
    updatedAt: ""
  })

  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfile(listing.profileId)
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [listing])

  return (
    <>
      <h1>ShowListing Component</h1>
      <ul>
        <li>{listing.itemName}</li>
        <li>{listing.description}</li>
        <li>{listing.condition}</li>
        <li>{listing.openToTrade ? 'Willing to Trade' : 'Not Willing to Trade'}</li>
        <li>{listing.price}</li>
      </ul>
      <h1>Seller</h1>
      <p>{profile.name}</p>
    </>
  );
}

export default ShowListing;