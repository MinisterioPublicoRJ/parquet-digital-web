export default function radarCriminalTransform(res) {
  console.log('radardatacriminal', res);

  const agreements = {
    numbers: res.nr_acordos_n_persecucao,
    maxValues: res.max_acordos,
    maxValueNames: res.nm_max_acordos,
    averages: res.med_aisp_acordos,
    percentages: res.perc_acordos,
    variations: res.var_med_acordos,
  };  
  const complaints = {
    numbers: res.nr_denuncias,
    maxValues: res.max_aisp_denuncias,
    maxValueNames: res.nm_max_denuncias,
    averages: res.med_aisp_denuncias,
    percentages: res.perc_denuncias,
    variations: res.var_med_denuncias,
  };
  const hearings = {
    numbers: res.nr_indeferimentos,
    maxValues: res.max_pacote_indeferimentos,
    maxValueNames: res.nm_max_indeferimentos,
    averages: res.med_pacote_indeferimentos,
    percentages: res.perc_indeferimentos,
    variations: res.var_med_indeferimentos,
  };
  const closingArguments = {
    numbers: res.nr_tac,
    maxValues: res.max_pacote_tac,
    maxValueNames: res.nm_max_tac,
    averages: res.med_pacote_tac,
    percentages: res.perc_tac,
    variations: res.var_med_tac,
  };
  const appeals = {
    numbers: res.nr_acoes,
    maxValues: res.max_pacote_acoes,
    maxValueNames: res.nm_max_acoes,
    averages: res.med_pacote_acoes,
    percentages: res.perc_acoes,
    variations: res.var_med_acoes,
  };

  return {
    // meta,
    complaints,
    agreements,
    hearings, 
    closingArguments,
    appeals
  };
}
