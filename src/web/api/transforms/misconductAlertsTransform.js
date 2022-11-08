/* eslint-disable no-irregular-whitespace */
export default function misconductAlertsTransform(data) {
  return data.map((alert) => ({
    alertCode: alert.alrt_sigla,
    iditem: alert.alrt_orgi_orga_dk,
    alertId: alert.alrt_key,
    docNum: alert.docu_nr_mp,
    docDk: alert.docu_dk,
    inicialDate: alert.ano_inicial ? new Date(alert.ano_inicial) : undefined,
    endDateProlongation: alert.dt_ultima_prorrogacao ? new Date(alert.dt_ultima_prorrogacao) : undefined,
  }));  
}
  
