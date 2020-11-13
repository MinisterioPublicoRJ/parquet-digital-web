import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  perfil: PropTypes.object.isRequired,
};

function ProfileDetails({ perfil }) {
  let details = null;
  if (perfil.hasOwnProperty('cpf')) {
    const birthdate = perfil.dt_nasc ? new Date(perfil.dt_nasc) : null;
    details = (
      <>
        <p>
          <strong>Nome:</strong>
          <br />
          {perfil.nm_investigado}
        </p>
        <p>
          <span>
            <strong>Data de Nascimento:</strong>
            <br />
            {birthdate ? Intl.DateTimeFormat().format(birthdate) : null}
          </span>
          <span>
            <strong>RG:</strong>
            <br />
            {perfil.rg}
          </span>
          <span>
            <strong>CPF:</strong>
            <br />
            {perfil.cpf}
          </span>
        </p>
        <p>
          <strong>Mãe:</strong>
          <br />
          {perfil.nm_mae}
        </p>
      </>
    );
  } else if (perfil.hasOwnProperty('cnpj')) {
    details = (
      <>
        <p>
          <strong>Nome:</strong>
          <br />
          {perfil.nm_pesj}
        </p>
        <p>
          <strong>CNPJ:</strong>
          <br />
          {perfil.cnpj}
        </p>
      </>
    );
  }

  return <div className="investigatedProfile-details">{details}</div>;
}

ProfileDetails.propTypes = propTypes;
export default ProfileDetails;
