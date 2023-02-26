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

  const [sortType, setSortType] = useState("asc")

  details.sort((a,b) => {
    if(sortType === "asc") {
      return a.price - b.price
    } else if(sortType === "des") {
      return b.price - a.price
    }
    return a.price - b.price
  })

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

  const handleCategory = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setSearchField(evt.target.value)
  }

  const handleSort = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    if(evt.target.value === "asc") {
      setSortType("asc")
    } else if(evt.target.value === "des") {
      setSortType("des")
    }
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
          <button onClick={handleCategory} value="Movie">Movies</button>
          <button onClick={handleCategory} value="Book">Books</button>
          <button onClick={handleCategory} value="Music">Music</button>
          <button onClick={handleCategory} value="">Reset</button>
        <h4>Sort</h4>
        <button onClick={handleSort} value={"asc"}>Sort Ascending</button>
        <button onClick={handleSort} value={"des"}>Sort Descending</button>
      </div>
      {searchList()}
    </section>
  );
}

export default Search;