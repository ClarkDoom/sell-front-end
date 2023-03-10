// npm modules
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";

// services
import * as listingService from '../../services/listingService'

// types 
import { ListingFormData, PhotoFormData } from "../../types/forms";

const EditListing = () => {
  const location = useLocation()
  const listing = location.state
  const navigate = useNavigate()

  const [checked, setChecked] = useState(false)

  const [formData, setFormData] = useState<ListingFormData>({
    itemName: listing.itemName,
    photos: listing.photos,
    description: listing.description,
    condition: listing.condition,
    openToTrade: listing.openToTrade,
    price: listing.price,
    type: listing.type,
    sold: listing.sold
  })

  // photo experiment
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  // end photo experiment


  const { itemName, photos, condition, description, openToTrade, price, type } = formData

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const selectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleCheckbox = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(!checked)
    setFormData({ ...formData, openToTrade: !checked })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await listingService.editListing(formData, listing.id)
      navigate(`/listings/${listing.id}`, { state: { listingId: listing.id, profileId: listing.profileId } })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>EditListing Component</h1>

      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="item-name">Item Name</label>
          <input
            type="text"
            id="item-name"
            value={itemName}
            name="itemName"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            name="description"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="photo-upload">
            Upload Another Photo
          </label>
          <input
            type="file"
            id="photo-upload"
            name="photo"
            onChange={handleChangePhoto}
          />
        </div>

        <div>
          <label htmlFor="condition">Condition</label>
          <select
            id="condition"
            value={condition}
            name="condition"
            onChange={selectChange}
          >
            <option value="Select">Select</option>
            <option value="Like New">Like New</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div>
          <label htmlFor="type">Listing Type</label>
          <select
            id="type"
            value={type}
            name="type"
            onChange={selectChange}
          >
            <option value="Select">Select</option>
            <option value="Movie">Movie</option>
            <option value="Books">Books</option>
            <option value="Music">Music</option>
          </select>
        </div>

        <div>
          <label htmlFor="open-to-trade">Open to trade?</label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckbox}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            name="price"
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}

export default EditListing;