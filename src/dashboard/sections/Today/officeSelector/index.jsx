import React from 'react';

import './styles.css';
import { useAuth } from '../../../../app/authContext';

function handleInnerClick(e) {
  e.stopPropagation();
}

function OfficeSelector({ isOpen, onToggle }) {
  const { user, currentOffice, setCurrentOffice } = useAuth();

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
          </div>
          <ul>
            {user.orgaosValidos.map(orgao => (
              <li>{orgao.nomeOrgao}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return null;
}

export default OfficeSelector;
