export default function radarCriminalTransform(res) {
  console.log('radardatacriminal', res);
  const archives = {
    numbers: res.nr_arquivamentos,
    maxValues: res.max_pacote_arquivamentos,
    maxValueNames: res.nm_max_arquivamentos,
    averages: res.med_pacote_aquivamentos,
    percentages: res.perc_arquivamentos,
    variations: res.var_med_arquivamentos,
  };
  const rejections = {
    numbers: res.nr_indeferimentos,
    maxValues: res.max_pacote_indeferimentos,
    maxValueNames: res.nm_max_indeferimentos,
    averages: res.med_pacote_indeferimentos,
    percentages: res.perc_indeferimentos,
    variations: res.var_med_indeferimentos,
  };
  const tac = {
    numbers: res.nr_tac,
    maxValues: res.max_pacote_tac,
    maxValueNames: res.nm_max_tac,
    averages: res.med_pacote_tac,
    percentages: res.perc_tac,
    variations: res.var_med_tac,
  };
  const actions = {
    numbers: res.nr_acoes,
    maxValues: res.max_pacote_acoes,
    maxValueNames: res.nm_max_acoes,
    averages: res.med_pacote_acoes,
    percentages: res.perc_acoes,
    variations: res.var_med_acoes,
  };
  const instaurations = {
    numbers: res.nr_instauracoes,
    maxValues: res.max_pacote_instauracoes,
    maxValueNames: res.nm_max_instauracoes,
    averages: res.med_pacote_instauracoes,
    percentages: res.perc_instauracoes,
    variations: res.var_med_instauracoes,
  };

  return {
    // meta,
    archives,
    rejections,
    tac,
    actions,
    instaurations,
  };
}
