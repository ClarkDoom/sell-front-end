import { useState } from "react";
import { useNavigate } from "react-router";

// types
import { ListingFormData } from "../../types/forms";
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
  })

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
      await listingService.createListing(formData, profileId)
      navigate('/listings')
    } catch (err) {
      console.log(err)
    }
  }

  return (
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
  );
}

export default CreateListing;