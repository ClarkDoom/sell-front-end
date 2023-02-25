// npm modules
import { useState, useEffect } from "react";

// services
import * as listingService from '../../services/listingService'

// types
import { Listing } from "../../types/models";

// components
import ListingCard from "../../components/ListingCard/ListingCard";
import Search from "../../components/Search/Search";

const BrowseListings = () => {

  const [listings, setListings] = useState<Listing[]>([])

  useEffect((): void => {
    const fetchListings = async (): Promise<void> => {
      try {
        const listingData: Listing[] = await listingService.getAllListings()
        setListings(listingData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
  }, [])

  return (
    <>
      <Search details={listings}/>
      {/* <h1>BrowseListings Component</h1>
      {listings.map(listing =>
        <ListingCard listing={listing} key={listing.itemName} />
      )} */}
    </>
  );
}

export default BrowseListings;