function orgaoTransformer(orgao) {
  const { cpf, nome, tipo, cdorgao, nm_org } = orgao;
  return {
    nomeOrgao: nm_org,
    cpf,
    nomeUser: nome,
    tipo,
    codigo: cdorgao,
  };
}

export function scaUserTranform(user) {
  const {
    cpf,
    matricula,
    nome,
    sexo,
    firstLogin,
    firstLoginToday,
    orgaoSelecionado,
    orgaosValidos,
    token,
  } = user;
  return {
    nome,
    sexo,
    firstLogin,
    firstLoginToday,
    cpf,
    matricula,
    token,
    orgaoSelecionado: orgaoTransformer(orgaoSelecionado),
    orgaosValidos: orgaosValidos.map(item => orgaoTransformer(item)),
  };
}

export function jwtUserTransform(user) {
  const { cpf, matricula, nome, sexo, first_login, first_login_today, token, orgao } = user;
  return {
    nome,
    sexo,
    firstLogin: first_login,
    firstLoginToday: first_login_today,
    cpf,
    matricula,
    token,
    orgaoSelecionado: {
      nomeOrgao: undefined,
      cpf,
      nomeUser: nome,
      tipo: user.tipo_orgao,
      codigo: orgao,
    },
    orgaosValidos: [],
  };
}
