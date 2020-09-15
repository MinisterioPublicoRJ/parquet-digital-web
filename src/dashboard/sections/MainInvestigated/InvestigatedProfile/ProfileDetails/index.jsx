import React from 'react';

function ProfileDetails({ perfil }) {
  let birthdate = new Date(perfil.dt_nasc);
  return (
    <>
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
    </>
  );
}
export default ProfileDetails;
