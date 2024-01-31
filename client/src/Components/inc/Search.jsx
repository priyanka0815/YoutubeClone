import React from 'react';
import {
  MicIcon,
  SearchIcon,
} from '../../utils/Icons';

const Search = () => {
  return (
    <div id="search_box">
      <form action="" id="SearchForm">
        <input type="text" placeholder="Search" />
        <button className="yt_icon" type="submit">
          <SearchIcon />
        </button>
      </form>

      <div className="yt_icon mic">
        <MicIcon />
      </div>
    </div>
  );
};

export default Search;
