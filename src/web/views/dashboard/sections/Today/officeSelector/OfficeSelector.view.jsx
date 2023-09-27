import React, { useState } from 'react';
import { useAppContext } from '../../../../../../core/app/App.context';
import { Search } from '../../../../../assets';
import { abbrevName } from '../../../../../utils';
import { useAlertsContext } from '../../Alerts/alertsContext';
import {
  selectorOuter,
  selectorModal,
  inputOrgaoSelect,
  selectorHeader,
  selectorSearchbox,
  selectorListWrapper,
} from './OfficeSelector.module.css';

function OfficeSelector() {
  const { user, updateOffice } = useAppContext();
  const { setAlerts } = useAlertsContext();
  const [filteredList, setFilteredList] = useState(user.orgaosValidos);

  function onOfficeClicked(office) {
    updateOffice(office);
    setAlerts(undefined);
  }

  const handleChange = (e) => {
    const inputValues = e.target.value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(' ');
    const filtered = user.orgaosValidos.filter((organ) =>
      inputValues.every(
        (word) =>
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
      ),
    );
    setFilteredList(filtered);
  };

  return (
    <div className={selectorOuter}>
      <div className={selectorModal}>
        <div className={selectorHeader}>
          <h2>Selecione a Promotoria:</h2>

          <div className={selectorSearchbox}>
            <input
              placeholder="Pesquisar..."
              type="text"
              onChange={handleChange}
              className={inputOrgaoSelect}
            />
            <Search />
          </div>
        </div>
        <div className={selectorListWrapper}>
          <ul>
            {filteredList.map((orgao) => (
              <button
                type="button"
                key={`${orgao.nomeOrgao}-${orgao.nomeUser}`}
                onClick={() => onOfficeClicked(orgao)}
              >
                <li>
                  {`${abbrevName(orgao.nomeOrgao)} \n`}
                  <span>{orgao.nomeUser}</span>
                </li>
              </button>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OfficeSelector;
