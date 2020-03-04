const tadayOutliersTransform = ({
  acervo_qtd = 0,
  primeiro_quartil = 0,
  mediana = 0,
  terceiro_quartil = 0,
  cod_atribuicao = 0,
}) => ({
  acervoQtd: acervo_qtd,
  primQ: primeiro_quartil,
  mediana: mediana,
  terQ: terceiro_quartil,
  cod: cod_atribuicao,
});

export default tadayOutliersTransform;
