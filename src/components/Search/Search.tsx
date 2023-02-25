import React, { useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import { Listing } from '../../types/models';


interface SearchProps {
  details: Listing[]
}

function Search(props: SearchProps) {

  const { details } = props
  const [searchField, setSearchField] = useState("");

  const filteredListings = details.filter(
    listing => {
      return (
        listing
        .itemName
        .toLowerCase()
        .includes(searchField.toLowerCase()) 
        // ||
        // listing
        // .email
        // .toLowerCase()
        // .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(evt.target.value);
  };

  function searchList() {
    return (
      <Scroll>
        <SearchList filteredListings={filteredListings} />
      </Scroll>
    );
  }

  return (
    <section>
      <div>
        <h2>Search Listings</h2>
      </div>
      <div>
        <input 
          type = "search" 
          placeholder = "Search Listings" 
          onChange = {handleChange}
        />
      </div>
      {searchList()}
    </section>
  );
}

export default Search;