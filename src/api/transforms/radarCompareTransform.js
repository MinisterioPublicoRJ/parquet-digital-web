export default function radarCompareTransform(raw) {
  return raw.map((organ) => ({
    meta: {
      codamp: organ.orgao_codamp,
      id: organ.orgao_id,
      name: organ.orgi_nm_orgao,
    },
    graphData: formatpercentiles(organ),
  }));
}

function formatpercentiles(organData) {
  const percentileKeys = Object.keys(organData).filter((key) => key.includes('perc_'));

  return percentileKeys.map((key) => {
    const y = organData[key] * 100;
    let x;
    switch (key) {
      case 'perc_arquivamentos':
        x = 'archives';
        break;
      case 'perc_cautelares':
        x = 'precautionary';
        break;
      case 'perc_acordos':
        x = 'agreements';
        break;
      case 'perc_denuncias':
        x = 'complaints';
        break;
      case 'perc_aberturas_vista':
        x = 'openCases';
        break;
      case 'perc_indeferimentos':
        x = 'rejections';
        break;
      case 'perc_tac':
        x = 'tac';
        break;
      case 'perc_acoes':
        x = 'actions';
        break;
      case 'perc_instauracoes':
        x = 'instaurations';
        break;
      default:
        x = '';
    }

    return { x, y };
  });
}
