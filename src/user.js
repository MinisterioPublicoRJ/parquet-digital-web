const user = {
  // FIXME: remove all the keys when login being fully operational
  username: 'SIDNEYROSA',
  cpf: '07355005766',
  orgao: 500002,
  pess_dk: 505895,
  nome: 'SIDNEY ROSA DA SILVA JUNIOR',
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IlNJRE5FWVJPU0EiLCJjcGYiOiIwNzM1NTAwNTc2NiIsIm9yZ2FvIjo1MDAwMDIsInBlc3NfZGsiOjUwNTg5NSwibm9tZSI6IlNJRE5FWSBST1NBIERBIFNJTFZBIEpVTklPUiJ9.AlHbOgUJT6E9zHjzL2qqgkutWPqkR5ucLcnrBnwhPVQ',
};

export const getUser = () => user;
export const setUser = data => {
  Object.assign(user, data);
};
