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

  details.sort((a, b) => {
    if (sortType === "asc") {
      return a.price - b.price
    } else if (sortType === "des") {
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
        <SearchList filteredListings={filteredListings} />
    );
  }

  const handleCategory = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    const target = evt.target as HTMLImageElement
    console.log("evt", evt)
    setSearchField(target.alt)
  }

  const handleSort = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    const target = evt.target as HTMLImageElement
    console.log(target)
    if (target.alt === "asc") {
      setSortType("asc")
    } else if (target.alt === "des") {
      setSortType("des")
    }
  }

  return (
    <div className="search-component">
      <div className="search-component-actions">
        <input
          type="search"
          placeholder="Search Listings"
          onChange={handleChange}
        />

        <h4>Categories</h4>
        <button onClick={handleCategory} value="Movie" id="search-component-button">
          <img src="/dvd.png" alt="Movie" />
        </button>
        <button onClick={handleCategory} value="Book" id="search-component-button">
          <img src="/books.png" alt="Book" />
        </button>
        <button onClick={handleCategory} value="Music" id="search-component-button">
          <img src="/music.png" alt="Music" />
        </button>
        <button onClick={handleCategory} value="" id="search-reset-button">
          <img src="/reset.png" alt="" />
        </button>

        <h4>Sort by Price</h4>
        <div className="sort-icons">
          <button onClick={handleSort} value={"asc"} className="sort-icon" id="search-component-button">
            <img src="/arrow-up.png" alt="asc" />
          </button>
            <button onClick={handleSort} value={"des"} className="sort-icon" id="search-component-button">
              <img src="/arrow-down.png" alt="des" />
            </button>
        </div>

      </div>
      {searchList()}
    </div>
  );
}

export default Search;