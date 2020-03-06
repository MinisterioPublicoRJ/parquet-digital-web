const openCasesDetailsTransform = ({ variacao_acervo = 0, top_n = [] }) => ({
  collectionVariation30Days: variacao_acervo,
  topProsecutors: top_n.map(p => ({
    name: p.nm_promotoria,
    collectionVariation30Days: p.variacao_acervo,
  })),
});

export default openCasesDetailsTransform;
