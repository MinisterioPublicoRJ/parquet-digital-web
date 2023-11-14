/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import SearchIcon from '../../../assets/svg/searchIcon';

const { SearchBoxOuter, SearchBoxInput } = styles;

function SearchBox({ onSearch }) {
  const searchInput = useRef(null);

  function handleSearchButtonClick(e) {
    e.preventDefault();
    onSearch(searchInput.current.value);
  }
  function handleSearchInput(e) {
    e.preventDefault();
    onSearch('');
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(searchInput.current.value);
    }
  }
  
  return (
    <div className={SearchBoxOuter}>
      <button onClick={handleSearchButtonClick} type="button" >
        <SearchIcon />
      </button>
      <input
        type="text"
        className={SearchBoxInput}
        placeholder="Pesquisar na lista"
        onClick={handleSearchInput}
        ref={searchInput}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default SearchBox;
