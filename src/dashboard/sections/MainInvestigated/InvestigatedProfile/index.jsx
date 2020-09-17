import React, { useState, useEffect } from 'react';

import './styles.css';
import { useAuth } from '../../../../app/authContext';
import { CustomTable } from '../../../../components';
import { TABLE_COLUMNS } from './investigatedProfileConstants';
import ProfileDetails from './ProfileDetails';
import Api from '../../../../api';

function InvestigatedProfile({ onToggle, representanteDk }) {
  const [pessDk, setPessDk] = useState(null);
  const { buildRequestParams } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isSimilarProfilesVisible, setIsSimilarProfilesVisible] = useState(false);

  async function getProfileData() {
    const data = pessDk
      ? await Api.getInvestigatedProfile({
          ...buildRequestParams(),
          representanteDk,
          pessDk,
        })
      : await Api.getInvestigatedProfile({
          ...buildRequestParams(),
          representanteDk,
        });
    console.log('data: ', data);
    console.log('pessdk: ', pessDk);
    setProfileData(data);
    setTableData(data.procedimentos ? data.procedimentos : []);
    return data;
  }

  useEffect(() => {
    getProfileData();
  }, [pessDk]);

  function renderComponent() {
    console.log('profiledata: ', profileData);
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
    if (profileData && profileData.perfil) {
      return (
        <article className="investigatedProfile-outer">
          <div className="investigatedProfile-details">
            <h2>
              <strong>Perfil do Investigado</strong>
            </h2>
            <ProfileDetails perfil={profileData.perfil} key={profileData.perfil.pess_dk} />
          </div>

          <button
            type="button"
            className="similar-profiles-btn"
            onClick={() => setIsSimilarProfilesVisible((prevValue) => !prevValue)}
          >
            Foram encontrados {profileData.similares.length} perfis similares ao solicitado
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
            {profileData.similares.map((similarProfile) => {
              return (
                <button
                  onClick={(e) => {
                    console.log('similarprofile:', similarProfile);
                    setPessDk(similarProfile.pess_dk);
                  }}
                >
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
