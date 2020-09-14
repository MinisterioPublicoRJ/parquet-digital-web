import React from 'react';

function ProfileDetails({ perfil }) {
  let birthdate = new Date(perfil.dt_nasc);
  return (
    <>
      <p>
        Nome:
        {perfil.nm_investigado}
      </p>
      <p>
        <span>Data de Nascimento: {Intl.DateTimeFormat().format(birthdate)}</span>
        <span>RG: {perfil.rg}</span> <span>CPF: {perfil.cpf}</span>
      </p>
      <p>Mãe: {perfil.nm_mae}</p>
    </>
  );
}
export default ProfileDetails;
