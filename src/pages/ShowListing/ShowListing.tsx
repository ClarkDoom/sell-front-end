import { useLocation } from "react-router";

const ShowListing = () => {
  const location = useLocation()
  const listing = location.state

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
      
    </>
  );
}

export default ShowListing;