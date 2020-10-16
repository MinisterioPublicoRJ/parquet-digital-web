export default function prescribedCrimeTransform(data) {
  return data.map((crime) => ({
    penalType: crime.tipo_penal,
    investigatedName: crime.nm_investigado,
    maximumPenalty: crime.max_pena,
    multiplyingOffenses: crime.delitos_multiplicadores,
    penalFactor: crime.fator_pena,
    maximumFactoredPenalty: crime.max_pena_fatorado,
    key: crime.adpr_chave,
    prescriptionInitialDate: new Date(crime.dt_inicio_prescricao)
      ? Intl.DateTimeFormat().format(new Date(crime.dt_inicio_prescricao))
      : null,
    prescriptionFinalDate: new Date(crime.dt_fim_prescricao)
      ? Intl.DateTimeFormat().format(new Date(crime.dt_fim_prescricao))
      : null,
  }));
}
