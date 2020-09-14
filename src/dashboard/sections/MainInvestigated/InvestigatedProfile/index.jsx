import React, { useState, useEffect } from 'react';

import './styles.css';
import { CustomTable, SectionTitle } from '../../../../components';
import { TABLE_COLUMNS } from './investigatedProfileConstants';
import ProfileDetails from './ProfileDetails';

function InvestigatedProfile({ onToggle, data }) {
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isSimilarProfilesVisible, setIsSimilarProfilesVisible] = useState(false);

  useEffect(() => {
    if (data.procedimentos) setTableData(data.procedimentos);
  }, tableData);

  function renderComponent() {
    if (apiError) {
      return (
        <article className="investigatedProfile-outer">
          <SectionTitle value="Perfil do investigado" glueToTop />
          Erro de api!
        </article>
      );
    }
    if (data.perfil) {
      console.log('procedi', data.procedimentos);
      return (
        <article className="investigatedProfile-outer">
          <div className="investigatedProfile-details">
            <SectionTitle value="Perfil do investigado" glueToTop />
            <ProfileDetails perfil={data.perfil} key={data.perfil.pess_dk} />
          </div>

          <button
            type="button"
            onClick={() => setIsSimilarProfilesVisible((prevValue) => !prevValue)}
          >
            Foram encontrados {data.similares.length} perfis similares ao solicitado
            <div
              className={`similar-profiles-arrow ${
                isSimilarProfilesVisible ? 'similar-profiles-arrow--rotated' : ''
              }`}
            ></div>
          </button>

          <div className="similar-profiles-list">
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
