// npm modules
import { useState, useEffect } from "react";

// services
import * as listingService from '../../services/listingService'

// types
import { Listing } from "../../types/models";

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
  },[listings])

  return (
    <>
      <h1>BrowseListings Component</h1>
      {listings.map(listing => 
        <p>
          {listing.itemName}  
        </p>
      )}
    </>
  );
}

export default BrowseListings;