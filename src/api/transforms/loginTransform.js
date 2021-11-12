import { abbrevName } from '../../utils';

function orgaoTransformer(orgao) {
  const { cpf, nome, tipo, cdorgao, nm_org, dps, pip_especializada } = orgao;
  return {
    nomeOrgao: nm_org,
    abbrevNomeOrgao: nm_org ? abbrevName(nm_org) : null,
    cpf,
    nomeUser: nome,
    tipo,
    codigo: cdorgao,
    dps,
    isSpecialized: pip_especializada,
  };
}

export function scaUserTranform(user) {
  const {
    cpf,
    matricula,
    nome,
    sexo,
    first_login,
    first_login_today,
    orgao_selecionado,
    orgaos_validos,
    token,
    atribuicao,
  } = user;
  return {
    nome,
    sexo,
    firstLogin: first_login,
    firstLoginToday: first_login_today,
    cpf,
    matricula,
    token,
    atribuicao,
    orgaoSelecionado: orgao_selecionado ? orgaoTransformer(orgao_selecionado) : null,
    orgaosValidos: orgaos_validos ? orgaos_validos.map((item) => orgaoTransformer(item)) : [],
  };
}

export function jwtUserTransform(user) {
  const { cpf, matricula, nome, sexo, first_login, first_login_today, token, orgao, tipo_orgao } =
    user;
  return {
    nome,
    sexo,
    firstLogin: first_login,
    firstLoginToday: first_login_today,
    cpf,
    matricula,
    token,
    orgao,
    orgaoSelecionado: {
      nomeOrgao: undefined,
      cpf,
      nomeUser: nome,
      tipo: tipo_orgao,
      codigo: orgao,
    },
    orgaosValidos: [],
  };
}
