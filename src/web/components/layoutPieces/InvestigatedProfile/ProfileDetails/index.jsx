import React from 'react';
import PropTypes from 'prop-types';
import { profileDetails, flexRow } from './ProfileDetails.module.css';

const propTypes = {
  perfil: PropTypes.shape({
    dt_nasc: PropTypes.string,
    nm_investigado: PropTypes.string,
    rg: PropTypes.string,
    cpf: PropTypes.string,
    nm_mae: PropTypes.string,
    nm_pesj: PropTypes.string,
    cnpj: PropTypes.string,
  }).isRequired,
};

function ProfileDetails({ perfil }) {
  let details = null;
  if (Object.prototype.hasOwnProperty.call(perfil, 'cpf')) {
    const birthday = perfil.dt_nasc ? new Date(perfil.dt_nasc) : null;
    details = (
      <>
        <p>
          <strong>Nome:</strong>
          <span>{perfil.nm_investigado}</span>
        </p>

        <div className={flexRow}>
          <p>
            <strong>Data de Nascimento:</strong>
            <span>
              {birthday ? Intl.DateTimeFormat('pt-br', { timeZone: 'UTC' }).format(birthday) : null}
            </span>
          </p>

          <p>
            <strong>RG:</strong>
            <span>{perfil.rg}</span>
          </p>

          <p>
            <strong>CPF:</strong>
            <span>{perfil.cpf}</span>
          </p>
        </div>

        <p>
          <strong>Mãe:</strong>
          <span>{perfil.nm_mae}</span>
        </p>
      </>
    );
  } else if (Object.prototype.hasOwnProperty.call(perfil, 'cnpj')) {
    details = (
      <>
        <p>
          <strong>Nome:</strong>
          <span>{perfil.nm_pesj}</span>
        </p>
        <p>
          <strong>CNPJ:</strong>
          <span>{perfil.cnpj}</span>
        </p>
      </>
    );
  }

  return <div className={profileDetails}>{details}</div>;
}

ProfileDetails.propTypes = propTypes;
export default ProfileDetails;
