// npm modules
import { Link } from "react-router-dom";
// types
import { ListingProps } from "../../types/props";

const ListingCard = (props: ListingProps): JSX.Element => {
  const { listing } = props

  return (
    <>
      <h1>ListingCard Component</h1>
      <p>{listing.itemName}</p>
      <p>{listing.price}</p>
      <Link 
        to={`/listings/${listing.id}`}
        state={listing}
      >
        More Details
      </Link>

    </>
  );
}

export default ListingCard;