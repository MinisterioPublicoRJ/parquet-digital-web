export default function misconductAlertsTransform(data) {
  console.log(data);
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
  
/*alrt_orgi_orga_dk: 300962
​​
alrt_sigla: "IIMP"
​​
ano_inicial: 2017
​​
docu_dk: 16484075
​​
docu_dt_cadastro: "2017-05-16T13:33:51"
​​
docu_dt_inicial: "2017-08-21T00:00:00"
​​
docu_fsdc_dk: 1
​​
docu_nr_mp: "201700486794"
​​
dt_conversao_ic: null
​​
dt_instauracao_ic: "2019-04-02T00:00:00"
​​
dt_ultima_prorrogacao: "2022-03-11T00:00:00"
​​
orgi_nm_orgao: "2ª PROMOTORIA DE JUSTIÇA DE TUTELA COLETIVA DE SÃO GONÇALO"
​​
qtde_prorrogacoes*/