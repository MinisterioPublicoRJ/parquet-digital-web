import React, { useState, useEffect } from 'react';
import './OfficeSelector.css';
import { useAppContext } from '../../../../../../core/app/App.context';
import { Search } from '../../../../../assets';
import { abbrevName } from '../../../../../utils';
import { useAlertsContext } from '../../Alerts/alertsContext';

function handleInnerClick(e) {
  e.stopPropagation();
}

function OfficeSelector({ close }) {
  const { user, updateOffice } = useAppContext();
  const {setAlerts} = useAlertsContext();
  const [filteredList, setFilteredList] = useState(user.orgaosValidos);

  function onOfficeClicked(office) {
    updateOffice(office);
    setAlerts(undefined);
  }

  const handleChange = e => {
    const inputValues = e.target.value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(' '); 
    const filtered = user.orgaosValidos.filter(
      organ =>
      inputValues.every(word => 
        organ.nomeOrgao
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(word) ||
        organ.abbrevNomeOrgao
          .toLowerCase()
          .normalize('NFD') 
          .replace(/[\u0300-\u036f]/g, '')
          .includes(word) ||
        organ.nomeUser
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(word),
      )
    );
    setFilteredList(filtered);
  };

    return (
      <div
        className="selector-outer"
        role="button"
        tabIndex="0"
        onClick={() => close()}
        onKeyDown={() => close()}
      >
        <div
          className="selector-modal"
          onClick={e => handleInnerClick(e)}
          onKeyDown={e => handleInnerClick(e)}
        >
          <div className="selector-header">
            <h2>Selecione a Promotoria:</h2>
            <input
              placeholder="Pesquisar..."
              type="text"
              onChange={handleChange}
              className="input-orgaoSelect"
            />
            <Search className="search" />
          </div>
          <div className="selector-listWrapper">
            <ul>
              {filteredList.map(orgao => (
                <li 
                  key={`${orgao.nomeOrgao}-${orgao.nomeUser}`}
                  onClick={() => onOfficeClicked(orgao)}
                >
                  {`${abbrevName(orgao.nomeOrgao)} \n`}
                  <span>{orgao.nomeUser}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

export default OfficeSelector;
