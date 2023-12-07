import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useAppContext } from '../../../../core/app/App.context';

import { TABLE_COLUMNS_PIP, MOBILE_TABLE_COLUMNS_PIP, TABLE_COLUMNS_TUTELA, MOBILE_TABLE_COLUMNS_TUTELA } from './investigatedProfileConstants';

import ProfileDetails from './ProfileDetails';
import Spinner from '../Spinner';
import CustomTable from '../CustomTable';

import { investigatedProfileOuterStyle, investigatedProfileHeaderStyle, similarProfilesListStyle, similarProfilesListVisible, similarProfilesArrowStyle, similarProfilesArrowRotatedStyle, similarProfilesBtnStyle, investigatedProfileTableWrapperStyle, currentStyle, investigatedSpinnerStyle } from './InvestigatedProfile.module.css';
import './styles.css';

const propTypes = {
  close: PropTypes.func.isRequired,
  representanteDk: PropTypes.number.isRequired,
  organType: PropTypes.number.isRequired,
};

function InvestigatedProfile({ representanteDk }) {
  const [pessDk, setPessDk] = useState(null);
  const { buildRequestParams, currentOffice, Api } = useAppContext();
  const [profileData, setProfileData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isSimilarProfilesVisible, setIsSimilarProfilesVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const organType = currentOffice.tipo;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      const width = e.currentTarget.innerWidth;
      if (width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);

  async function getProfileData() {
    let organTypeName;
    if (organType === 1) organTypeName = 'tutela';
    if (organType === 2) organTypeName = 'pip';

    let promise;
    setLoading(true);
    try {
      promise =
        typeof pessDk === 'number'
          ? Api.getInvestigatedProfile({
            ...buildRequestParams(),
            organTypeName,
            representanteDk,
            pessDk,
          })
          : Api.getInvestigatedProfile({
            ...buildRequestParams(),
            organTypeName,
            representanteDk,
          });
      const data = await promise;
      setProfileData(data);
      setTableData(data.procedures ? data.procedures : []);
      return data;
    } catch (error) {
      setApiError(true);
      return error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfileData();
  }, [pessDk]);

  function renderComponent() {
    if (apiError) {
      return (
        <article className={investigatedProfileOuterStyle}>
          <h2>
            <strong>Perfil do Investigado</strong>
          </h2>
          <span>Erro de api!</span>
        </article>
      );
    }
    if (loading && !profileData) {
      return (
        <article className={investigatedProfileOuterStyle}>
          <Spinner size="large" />
        </article>
      );
    }
    if (profileData && profileData.profile) {
      return (
        <article className={investigatedProfileOuterStyle}>
          <div className={investigatedProfileHeaderStyle}>
            <h2>
              <strong>Perfil do Investigado</strong>
            </h2>
            <ProfileDetails
              perfil={profileData.profile}
              key={`${profileData.profile.pess_dk}-main`}
            />
          </div>

          <button
            type="button"
            className={similarProfilesBtnStyle}
            onClick={() => setIsSimilarProfilesVisible((prevValue) => !prevValue)}
          >
            Foram encontrados <span>{profileData.similars.length}</span> perfis similares ao solicitado.
            <div
              className={`${similarProfilesArrowStyle} ${isSimilarProfilesVisible ? similarProfilesArrowRotatedStyle : ''}`}
            />
          </button>

          <div
            className={`${similarProfilesListStyle} ${isSimilarProfilesVisible ? similarProfilesListVisible : ''}`}
          >
            {profileData.similars.map((similarProfile) => (
              <button
                onClick={() => {
                  setPessDk((prevValue) =>
                    prevValue === similarProfile.pess_dk ? null : similarProfile.pess_dk,
                  );
                }}
                className={similarProfile.pess_dk === pessDk ? `${currentStyle}` : ''}
                type="button"
                key={`${similarProfile.pess_dk}-button`}
              >
                <ProfileDetails perfil={similarProfile} key={similarProfile.pess_dk} />
              </button>
            ))}
          </div>

          <div className={investigatedProfileTableWrapperStyle}>
            {loading && <Spinner className={investigatedSpinnerStyle} size="medium" />}
            {!loading && !isMobile && (
              <CustomTable
                data={tableData}
                columns={organType === 1 ? TABLE_COLUMNS_TUTELA : TABLE_COLUMNS_PIP}
                showHeader
              />
            )}
            {!loading && isMobile && (
              <CustomTable
                data={tableData}
                columns={organType === 1 ? MOBILE_TABLE_COLUMNS_TUTELA : MOBILE_TABLE_COLUMNS_PIP}
                showHeader
              />
            )}
          </div>
        </article>
      );
    }
    return null;
  }
  return renderComponent();
}

InvestigatedProfile.propTypes = propTypes;
export default InvestigatedProfile;
