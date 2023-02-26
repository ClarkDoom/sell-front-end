// npm modules
import { useState, useEffect } from "react";

// services
import * as listingService from '../../services/listingService'

// types
import { Listing } from "../../types/models";

// components
import Search from "../../components/Search/Search";

const BrowseListings = () => {

  const [listings, setListings] = useState<Listing[]>([])

  useEffect((): void => {
    const fetchListings = async (): Promise<void> => {
      try {
        const listingData: Listing[] = await listingService.getAllListings()
        const filteredListingData = listingData.filter(listing => { return listing.sold === false})
        setListings(filteredListingData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
  }, [])

  return (
    <>
      <h1>BrowseListings Component</h1>
      <Search details={listings}/>
      
      {/* <h1>BrowseListings Component</h1>
      {listings.map(listing =>
        <ListingCard listing={listing} key={listing.itemName} />
      )} */}
    </>
  );
}

export default BrowseListings;