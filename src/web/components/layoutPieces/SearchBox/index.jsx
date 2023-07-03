import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import  SearchIcon from '../../../assets/svg/searchIcon';

const {
  SearchBoxOuter,
  SearchBoxInput,
} = styles;

function SearchBox({ onSearch }) {
  const searchInput = useRef(null);


function handleSearchButtonClick() {
    onSearch(searchInput.current.value);
  }


  return (
    <div className={SearchBoxOuter}>
      <SearchIcon />
      <input
          type="text"
          className={SearchBoxInput}
          onClick={handleSearchButtonClick}
          onChange={handleSearchButtonClick}
          placeholder="Pesquisar na lista"
          ref={searchInput}

        />
    </div>
  );
}

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default SearchBox;
