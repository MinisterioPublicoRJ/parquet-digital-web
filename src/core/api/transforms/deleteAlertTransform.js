export default function deleteAlertsTransform(data) {
    return data.map((alert) => ({
      alertCode: alert.alrt_sigla,
      alertId: alert.alrt_key,
      orgao: alert.orgao,
     
    }));  
  }
    
  