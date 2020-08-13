import React from 'react';

import './styles.css';
import { useAuth } from '../../../../app/authContext';

function handleInnerClick(e) {
  e.stopPropagation();
}

function OfficeSelector({ isOpen, onToggle }) {
  const { user, updateOffice } = useAuth();

  function onOfficeClicked(office) {
    updateOffice(office);
    onToggle();
  }

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
            <button className="btn-orgaoSelect"></button>
          </div>
          <div className="selector-listWrapper">
            <ul>
              {user.orgaosValidos.map(orgao => (
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
