export default function processDetailTransform(data) {
  const characters = data.personagens.map((personagem) => ({
    name: personagem.nome || '-',
    role: personagem.papel || '-',
  }));

  const matters = data.assuntos.map(({ assunto, assunto_hierarquia }) => ({
    matter: assunto || '-',
    detail: assunto_hierarquia || '-',
  }));

  const {
    situacao,
    fase,
    orgao_responsavel,
    orgao_carga,
    ds_sigilo,
    classe,
    materia,
  } = data.documento;

  const identification = {
    situation: situacao || '-',
    phase: fase || '-',
    currentOwner: orgao_responsavel || '-',
    loader: orgao_carga || '-',
    secrecy: ds_sigilo || '-',
    docClass: classe || '-',
    matter: materia || '-',
  };

  const proceedings = data.movimentos.map(
    ({ dt_andamento, andamento, andamento_hierarquia, pessoa }) => ({
      date: dt_andamento ? dt_andamento.split('-').reverse().join('/') : '-',
      person: pessoa || '-',
      motion: andamento || '-',
      motionDetails: andamento_hierarquia || '-',
    }),
  );

  return { characters, matters, identification, proceedings };
}
