import { snakeToCamel } from '../../utils';

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

export default function loginTransform(userObj) {
  console.log('user', userObj);
  const res = {};
  const keys = Object.keys(userObj);
  keys.forEach(key => {
    res[snakeToCamel(key)] = userObj[key];
  });
  return res;
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

export function jwtUserTransform(user) {}
