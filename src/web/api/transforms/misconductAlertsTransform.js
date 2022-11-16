/* eslint-disable no-irregular-whitespace */
export default function misconductAlertsTransform(data) {
  return data.map((alert) => ({
    alertCode: alert.alrt_sigla,
    iditem: alert.alrt_orgi_orga_dk,
    alertId: alert.alrt_key,
    docNum: alert.docu_nr_mp,
    docDk: alert.docu_dk,
    initialDate: alert.ano_inicial ? new Date(alert.ano_inicial) : undefined,
    lastProrrogationDate: alert.dt_ultima_prorrogacao ? Intl.DateTimeFormat('pt-br', { timeZone: 'UTC' }).format(new Date(alert.dt_ultima_prorrogacao)) : undefined,
  }));  
}
  
