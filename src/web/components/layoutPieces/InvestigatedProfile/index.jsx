import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useAppContext } from '../../../../core/app/App.context';

import {
  TABLE_COLUMNS_PIP,
  MOBILE_TABLE_COLUMNS_PIP,
  TABLE_COLUMNS_TUTELA,
  MOBILE_TABLE_COLUMNS_TUTELA,
} from './investigatedProfileConstants';

import ProfileDetails from './ProfileDetails';
import Spinner from '../Spinner';
import CustomTable from '../CustomTable';

import {
  investigatedProfileOuter,
  investigatedProfileHeader,
  titleOnly,
  similarProfilesList,
  similarProfilesListVisible,
  similarProfilesArrow,
  similarProfilesArrowRotated,
  similarProfilesBtn,
  investigatedProfileTableWrapper,
  current,
  investigatedSpinner,
  hideInMobile,
  spinnerWrapper,
  errorMessage,
} from './InvestigatedProfile.module.css';
import './styles.css';

import { LoginPromotron } from '../../../assets';

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

  const setMobile = () => {
    const width = window.innerWidth;

    if (width <= 769) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    setMobile();
    window.addEventListener('resize', setMobile);
  }, [isMobile]);

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
        <article className={investigatedProfileOuter}>
          <div className={`${investigatedProfileHeader} ${titleOnly}`}>
            <h2>
              <strong>Perfil do Investigado</strong>
            </h2>
          </div>

          <strong className={errorMessage}>Erro de API!</strong>
        </article>
      );
    }
    if (loading && !profileData) {
      return (
        <article className={investigatedProfileOuter}>
          <div className={spinnerWrapper}>
            <Spinner size="large" />
          </div>
        </article>
      );
    }
    if (profileData && profileData.profile) {
      return (
        <article className={investigatedProfileOuter}>
          <div className={investigatedProfileHeader}>
            <h2>
              <strong>Perfil do Investigado</strong>
            </h2>
            <ProfileDetails
              perfil={profileData.profile}
              key={`${profileData.profile.pess_dk}-main`}
            />
            <div className={hideInMobile}>
              <LoginPromotron />
            </div>
          </div>

          <button
            type="button"
            className={similarProfilesBtn}
            onClick={() => setIsSimilarProfilesVisible((prevValue) => !prevValue)}
          >
            Foram encontrados <span>{profileData.similars.length}</span> perfis similares ao
            solicitado.
            <div
              className={`${similarProfilesArrow} ${
                isSimilarProfilesVisible ? similarProfilesArrowRotated : ''
              }`}
            />
          </button>

          <div
            className={`${similarProfilesList} ${
              isSimilarProfilesVisible ? similarProfilesListVisible : ''
            }`}
          >
            {profileData.similars.map((similarProfile) => (
              <button
                onClick={() => {
                  setPessDk((prevValue) =>
                    prevValue === similarProfile.pess_dk ? null : similarProfile.pess_dk,
                  );
                }}
                className={similarProfile.pess_dk === pessDk ? `${current}` : ''}
                type="button"
                key={`${similarProfile.pess_dk}-button`}
              >
                <ProfileDetails perfil={similarProfile} key={similarProfile.pess_dk} />
              </button>
            ))}
          </div>

          <div className={investigatedProfileTableWrapper}>
            {loading && <Spinner className={investigatedSpinner} size="medium" />}
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
