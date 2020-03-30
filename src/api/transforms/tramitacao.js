export default function tramitacaoTransform(data) {
  return data.map(alert => ({
    orgao: alert.orgao,
  }));
}
