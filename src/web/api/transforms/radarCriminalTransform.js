export default function radarCriminalTransform(res) {
  //console.log('radardatacriminal', res);

  const agreements = {
    numbers: res.nr_acordos_n_persecucao,
    maxValues: res.max_acordos,
    maxValueNames: res.nm_max_acordos,
    averages: res.med_acordos,
    percentages: res.perc_acordos,
    variations: res.var_med_acordos,
  };  
  const complaints = {
    numbers: res.nr_denuncias,
    maxValues: res.max_denuncias,
    maxValueNames: res.nm_max_denuncias,
    averages: res.med_denuncias,
    percentages: res.perc_denuncias,
    variations: res.var_med_denuncias,
  };
  const hearings = {
    numbers: res.nr_audiencia,
    maxValues: res.max_audiencia,
    maxValueNames: res.nm_max_audiencia,
    averages: res.med_audiencia,
    percentages: res.perc_audiencia,
    variations: res.var_med_audiencia,
  };
  const closingArguments = {
    numbers: res.nr_alegacoesfinais,
    maxValues: res.max_alegacoesfinais,
    maxValueNames: res.nm_max_alegacoesfinais,
    averages: res.med_alegacoesfinais,
    percentages: res.perc_alegacoesfinais,
    variations: res.var_med_alegacoesfinais,
  };
  const appeals = {
    numbers: res.nr_recurso,
    maxValues: res.max_recurso,
    maxValueNames: res.nm_max_recurso,
    averages: res.med_recurso,
    percentages: res.perc_recurso,
    variations: res.var_med_recurso,
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
