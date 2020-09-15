import React, { useState } from 'react';

import './styles.css';
import { CustomTable } from '../../../../components';
import { TABLE_COLUMNS } from './investigatedProfileConstants';
import ProfileDetails from './ProfileDetails';

function InvestigatedProfile({ onToggle, data }) {
  const [tableData, setTableData] = useState(data.procedimentos ? data.procedimentos : []);
  const [apiError, setApiError] = useState(false);
  const [isSimilarProfilesVisible, setIsSimilarProfilesVisible] = useState(false);

  function renderComponent() {
    if (apiError) {
      return (
        <article className="investigatedProfile-outer">
          <h2>
            <strong>Perfil do Investigado</strong>
          </h2>
          Erro de api!
        </article>
      );
    }
    if (data.perfil) {
      return (
        <article className="investigatedProfile-outer">
          <div className="investigatedProfile-details">
            <h2>
              <strong>Perfil do Investigado</strong>
            </h2>
            <ProfileDetails perfil={data.perfil} key={data.perfil.pess_dk} />
          </div>

          <button
            type="button"
            className="similar-profiles-btn"
            onClick={() => setIsSimilarProfilesVisible((prevValue) => !prevValue)}
          >
            Foram encontrados {data.similares.length} perfis similares ao solicitado
            <div
              className={`similar-profiles-arrow ${
                isSimilarProfilesVisible ? 'similar-profiles-arrow--rotated' : ''
              }`}
            ></div>
          </button>

          <div
            className={`similar-profiles-list ${
              isSimilarProfilesVisible ? 'similar-profiles-list--visible' : ''
            }`}
          >
            {data.similares.map((similarProfile) => {
              return (
                <button>
                  <ProfileDetails perfil={similarProfile} key={similarProfile.pess_dk} />
                </button>
              );
            })}
          </div>

          <div className="investigatedProfile-tableWrapper">
            <CustomTable data={tableData} columns={TABLE_COLUMNS} showHeader />
          </div>

          <div className="profile-close">
            <button type="button" className="close" aria-label="Fechar" onClick={onToggle}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </article>
      );
    }

    return null;
  }
  return renderComponent();
}

export default InvestigatedProfile;
