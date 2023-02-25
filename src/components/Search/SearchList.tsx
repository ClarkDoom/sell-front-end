import React from 'react';
import ListingCard from '../ListingCard/ListingCard';
import { Listing } from '../../types/models';

interface SearchListProps {
  filteredListings: Listing[]
}

function SearchList(props: SearchListProps) {
  const { filteredListings } = props
  const filtered = filteredListings.map(listing =>  <ListingCard key={listing.id} listing={listing} />); 
  return (
    <div>
      {filtered}
    </div>
  );
}

export default SearchList;