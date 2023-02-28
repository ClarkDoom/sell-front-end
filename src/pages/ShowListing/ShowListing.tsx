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
      await listingService.editListing({ sold: true }, listing.id)
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
    <div className="show-listing-page">
      <h1>{listing.itemName}</h1>

      {loggedInUser === profileId ?
        <div id="listing-users-btns">
          <Link
            to={`/listings/${listing.id}/edit`}
            state={listing}
          >
            <button id="listing-users-btn">Edit</button>
          </Link>
          <button id="listing-users-btn" onClick={handleDelete}>Delete</button>
          <button id="listing-users-btn" onClick={handleMarkAsSold}>Mark Sold</button>
        </div>
        :
        ""
      }

      <div className="listing-details">
        {listing.photos?.map((photo, idx) =>
          <img id="listing-img" key={idx} src={photo} alt="" />
        )}
        <div className="listing-detail">
          <h3>Listing Type</h3>
          <p>{listing.type}</p>
        </div>
        <div className="listing-detail">
          <h3>Description</h3>
          <p>{listing.description}</p>
        </div>
        <div className="listing-detail">
          <h3>Condition</h3>
          <p>{listing.condition}</p>
        </div>
        <div className="listing-detail">
          <h3>Price</h3>
          <p>${listing.price}.00</p>
          <p>{listing.openToTrade ? 'Willing to Trade' : 'Not Willing to Trade'}</p>
        </div>
      </div>

      <h1>Seller</h1>
      <div className="profile-details">
        <img id="profile-img" src={profile.photo} alt="" />
        <div className="name-and-contact">
          <p>{profile.name}</p>
          <a href={`mailto:${profile.email}?subject=${listing.itemName}&body=Hello, is this item still available?`}>
            <button id="contact-seller-btn">Contact Seller</button>
          </a>
        </div>
      </div>

    </div>
  );
}

export default ShowListing;