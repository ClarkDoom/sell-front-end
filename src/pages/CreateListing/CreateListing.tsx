import { useState } from "react";
import { useNavigate } from "react-router";

// types
import { ListingFormData, PhotoFormData } from "../../types/forms";
import { CreateListingProps } from "../../types/props";

// services
import * as listingService from '../../services/listingService'

const CreateListing = (props: CreateListingProps) => {
  const { profileId } = props

  const navigate = useNavigate()

  const [checked, setChecked] = useState(false)

  const [formData, setFormData] = useState<ListingFormData>({
    itemName: '',
    photos: [],
    description: '',
    condition: '',
    openToTrade: checked,
    price: 0,
    type: '',
    sold: false
  })

  // photo experiement

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
      await listingService.createListing(formData, profileId!, photoData)
      alert('Listing created!')
      navigate('/listings')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="create-listing-form">

      <form
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="title">Welcome</div>
        <div className="subtitle">Create a listing!</div>

        <div className="input-container ic1">
          <input
            className="input"
            placeholder=" "
            type="text"
            id="item-name"
            value={itemName}
            name="itemName"
            onChange={handleChange}
          />
          <div className="cut"></div>
          <label
            className="placeholder"
            htmlFor="item-name"
          >Item Name</label>
        </div>

        <div className="input-container ic2">
          <input
            className="input"
            placeholder=" "
            type="text"
            id="description"
            value={description}
            name="description"
            onChange={handleChange}
          />
          <div className="cut"></div>
          <label
            className="placeholder"
            htmlFor="description">Description</label>
        </div>

        <div className="input-container ic2">
          <select
            className="input"
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
          <div className="cut"></div>
          <label
            className="placeholder"
            htmlFor="description">Condition</label>
        </div>

        <div className="input-container ic2">
          <select
            className="input"
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
          <div className="cut"></div>
          <label
            className="placeholder"
            htmlFor="type">Listing Type</label>
        </div>



        <div className="input-container ic2">
          <input
            className="input"
            placeholder=" "
            type="number"
            id="price"
            value={price}
            name="price"
            onChange={handleChange}
          />
          <div className="cut"></div>
          <label
            className="placeholder"
            htmlFor="price">Price</label>
        </div>


        <div className="photo-trade">
          <h3>Upload Photo</h3>
          <div className="input-container ic2" id="photo-upload">
            <input
              type="file"
              id="photo-upload"
              name="photo"
              onChange={handleChangePhoto}
            />
          </div>
        </div>

        <div className="photo-trade">
          <h3>Willing to Trade</h3>
          <div className="input-container ic2">
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckbox}
              id="willing-to-trade"
            />
          </div>
        </div>


        <button className="submit">Submit</button>
      </form>

    </div>
  );
}

export default CreateListing;