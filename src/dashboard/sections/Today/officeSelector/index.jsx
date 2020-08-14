import React, { useState, useEffect } from 'react';

import './styles.css';
import { useAuth } from '../../../../app/authContext';
import { logDOM } from '@testing-library/react';

function handleInnerClick(e) {
  e.stopPropagation();
}

function OfficeSelector({ isOpen, onToggle }) {
  const { user, updateOffice } = useAuth();
  const [filteredList, setFilteredList] = useState(user.orgaosValidos);

  function onOfficeClicked(office) {
    updateOffice(office);
    onToggle();
  }

  const handleChange = e => {
    const inputValue = e.target.value.toLowerCase();
    const filtered = user.orgaosValidos.filter(
      organ =>
        organ.nomeOrgao.toLowerCase().includes(inputValue) ||
        organ.nomeUser.toLowerCase().includes(inputValue),
    );
    setFilteredList(filtered);
  };

  if (isOpen) {
    return (
      <div
        className="selector-outer"
        onClick={onToggle}
        onKeyDown={onToggle}
        role="button"
        tabIndex="0"
      >
        <div
          className="selector-modal"
          onClick={e => handleInnerClick(e)}
          onKeyDown={e => handleInnerClick(e)}
        >
          <div className="selector-header">
            <h2>Selecione a Promotoria:</h2>
            <input
              type="text"
              placeholder="Pesquisar..."
              onChange={handleChange}
              className="input-orgaoSelect"
            />
          </div>
          <div className="selector-listWrapper">
            <ul>
              {filteredList.map(orgao => (
                <li
                  key={`${orgao.nomeOrgao}-${orgao.nomeUser}`}
                  onClick={() => onOfficeClicked(orgao)}
                >
                  {`${orgao.nomeOrgao} \n`}
                  <span>{orgao.nomeUser}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default OfficeSelector;
