import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  perfil: PropTypes.node.isRequired,
};

function ProfileDetails({ perfil }) {
  let birthdate = new Date(perfil.dt_nasc);
  return (
    <div className="investigatedProfile-details">
      <p>
        <strong>Nome:</strong> <br />
        {perfil.nm_investigado}
      </p>
      <p>
        <span>
          <strong>Data de Nascimento:</strong> <br />
          {Intl.DateTimeFormat().format(birthdate)}
        </span>
        <span>
          <strong>RG:</strong> <br />
          {perfil.rg}
        </span>
        <span>
          <strong>CPF:</strong> <br />
          {perfil.cpf}
        </span>
      </p>
      <p>
        <strong>Mãe:</strong> <br />
        {perfil.nm_mae}
      </p>
    </div>
  );
}

ProfileDetails.propTypes = propTypes;
export default ProfileDetails;
