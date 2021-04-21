export default function processDetailTransform(data) {
  const characters = data.personagens.map((personagem) => ({
    pers_dk: personagem.pers_dk,
    pess_dk: personagem.pess_dk,
    role: personagem.papel,
    person_type: personagem.tipo_pessoa,
    quantity: personagem.qtd,
    name: personagem.nome,
  }));

  return { characters, ...data };
}
