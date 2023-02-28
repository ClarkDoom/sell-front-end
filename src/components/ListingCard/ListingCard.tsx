// npm modules
import { Link } from "react-router-dom";
// types
import { ListingProps } from "../../types/props";

const ListingCard = (props: ListingProps): JSX.Element => {
  const { listing } = props

  return (
    <div className="listing-card">

      {listing.photos?.map((photo, idx) =>
        <img key={idx} src={photo} alt="" />
      )}
      <div className="listing-card-details">
        <h1>{listing.itemName}</h1>
        <p>${listing.price}.00</p>
        <Link
          to={`/listings/${listing.id}`}
          state={{ listingId: listing.id, profileId: listing.profileId }}
        >
          <button className="listing-card-submit-btn">
            More Details
          </button>
        </Link>
      </div>

    </div>
  );
}

export default ListingCard;