export default function radarTransform(res) {
  const meta = {
    package: res.aisp_codigo,
    id: res.orgao_id,
    date: new Date(res.dt_calculo),
  };
  const archives = {
    numbers: res.nr_arquivamentos,
    maxValues: res.max_aisp_arquivamentos,
    maxValueNames: res.nm_max_arquivamentos,
    averages: res.med_aisp_arquivamentos,
    percentages: res.perc_arquivamentos,
    variations: res.var_med_arquivamentos,
  };
  const agreements = {
    numbers: res.nr_acordos_n_persecucao,
    maxValues: res.max_aisp_acordos,
    maxValueNames: res.nm_max_acordos,
    averages: res.med_aisp_acordos,
    percentages: res.perc_acordos,
    variations: res.var_med_acordos,
  };
  const openCases = {
    numbers: res.nr_aberturas_vista,
    maxValues: res.max_aisp_aberturas_vista,
    maxValueNames: res.nm_max_abeturas_vista,
    averages: res.med_aisp_aberturas_vista,
    percentages: res.perc_aberturas_vista,
    variations: res.var_med_aberturas_vista,
  };
  const complaints = {
    numbers: res.nr_denuncias,
    maxValues: res.max_aisp_denuncias,
    maxValueNames: res.nm_max_denuncias,
    averages: res.med_aisp_denuncias,
    percentages: res.perc_denuncias,
    variations: res.var_med_denuncias,
  };
  const precautionary = {
    numbers: res.nr_cautelares,
    maxValues: res.max_aisp_cautelares,
    maxValueNames: res.nm_max_cautelares,
    averages: res.med_aisp_cautelares,
    percentages: res.perc_cautelares,
    variations: res.var_med_cautelares,
  };

  return {
    meta,
    archives,
    agreements,
    precautionary,
    complaints,
    openCases,
  };
}
