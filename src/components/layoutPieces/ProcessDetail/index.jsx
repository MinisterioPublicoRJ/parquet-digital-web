import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import Api from '../../../api';
import { Spinner } from '..';
import { LoginPromotron } from '../../../assets';

const propTypes = {
  onToggle: PropTypes.func.isRequired,
};

function ProcessDetail({ onToggle }) {
  const [processData, setProcessData] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getProcessData() {
    let promise;
    setLoading(true);
    try {
      const data = await promise;
      return data;
    } catch (error) {
      setApiError(true);
      return error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProcessData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, );

  function renderComponent() {
    if (apiError) {
      return (
        <article >
          <h2>
            <strong>Detalhe do processo</strong>
          </h2>
          Erro de api!
        </article>
      );
    }
    if (loading && !profileData) {
      return (
        <article >
          <Spinner size="large" />
        </article>
      );
    }
    if (profileData && profileData.profile) {
      return (
            <LoginPromotron height={150} />
      );
    }
    return null;
  }
  return renderComponent();
}

ProcessDetail.propTypes = propTypes;
export default ProcessDetail;
