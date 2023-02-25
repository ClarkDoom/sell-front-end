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
        ||
        listing
          .type
          .toLowerCase()
          .includes(searchField.toLowerCase())
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

  const handleCategory = (evt) => {
    evt.preventDefault()
    setSearchField(evt.target.value)
  }

  return (
    <section>
      <div>
        <h2>Search Listings</h2>
      </div>
      <div>
        <input
          type="search"
          placeholder="Search Listings"
          onChange={handleChange}
        />
        <h4>Categories</h4>
        <form onClick={handleCategory}>
          <button value="Movie">Movies</button>
          <button value="Book">Books</button>
          <button value="Music">Music</button>
        </form>
      </div>
      {searchList()}
    </section>
  );
}

export default Search;