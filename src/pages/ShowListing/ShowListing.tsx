import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// types
import { Profile, Listing } from "../../types/models";
import { ShowListingProps } from "../../types/props";
import { ListingFormData } from "../../types/forms";

// services
import * as profileService from '../../services/profileService'
import * as listingService from '../../services/listingService'

const ShowListing = (props: ShowListingProps): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const listingId = location.state.listingId
  const profileId = location.state.profileId

  const { loggedInUser } = props

  const [profile, setProfile] = useState<Profile>({
    name: "",
    userName: "",
    photo: "",
    id: 0,
    createdAt: "",
    updatedAt: "",
    listings: [],
    email: ""
  })
  const [listing, setListing] = useState<Listing>({
    id: 0,
    itemName: "",
    photos: [],
    description: "",
    condition: "",
    openToTrade: false,
    price: 0,
    profileId: { id: 0 },
    type: '',
    sold: false
  })

  const handleDelete = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await listingService.deleteListing(listingId)
      alert('Listing Deleted')
      navigate('/listings')
    } catch (err) {
      console.log(err)
    }
  }


  const handleMarkAsSold = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await listingService.editListing({sold: true}, listing.id)
      alert("Listing marked as sold")
      navigate(`/listings`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect((): void => {
    const fetchListing = async (): Promise<void> => {
      try {
        const listingData: Listing = await listingService.getListing(listingId)
        setListing(listingData)

      } catch (error) {
        console.log(error)
      }
    }
    fetchListing()
  }, [listingId])

  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfile(profileId)
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [listingId])

  if (!profileId || !listingId) return <>loading</>

  return (
    <>
      <h1>ShowListing Component</h1>

      {loggedInUser === profileId ?
        <div id="listing-users-btns">
          <Link
            to={`/listings/${listing.id}/edit`}
            state={listing}
          >
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleMarkAsSold}>Mark Sold</button>
        </div>
        :
        ""
      }
      <ul>
        <li>{listing.itemName}</li>
        <li>{listing.description}</li>
        <li>{listing.condition}</li>
        <li>{listing.openToTrade ? 'Willing to Trade' : 'Not Willing to Trade'}</li>
        <li>{listing.price}</li>
        <li>{listing.type}</li>
        <li>Sold? {listing.sold ? "true" : "false"}</li>
      </ul>
      <h1>Seller</h1>
      <a href={`mailto:${profile.email}?subject=${listing.itemName}&body=Hello, is this item still available?`}>
        <button>Contact Seller</button>
      </a>


      <p>{profile.name}</p>
    </>
  );
}

export default ShowListing;