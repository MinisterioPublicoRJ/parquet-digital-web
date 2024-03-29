import LogoDiagnóstico from '../../../../assets/imgs/Image.png';
import LogoDominio from '../../../../assets/imgs/Image1.png';
import LogoCovid from '../../../../assets/imgs/Image2.png';
import LogoSaneamento from '../../../../assets/imgs/Image3.png';
import LogoInLoco from '../../../../assets/imgs/Image4.png';

export const ALTERNATIVE_SCREEN_DATA = [
  {
    id: 'Diagnostico-das-Promotorias',
    title: 'Diagnóstico das Promotorias',
    text: 'Comparativo de feitos entre Promotorias.',
    img: LogoDiagnóstico,
    url:
      'https://tableau2020.mprj.mp.br/t/MPMAPAS/views/DiagnosticoPJ/CAPA?:origin=card_share_link&:embed=n',
  },
  {
    id: 'Dominio',
    title: 'Domínio',
    text: 'Listagem de procedimentos, sua mesa e alguns alertas.',
    img: LogoDominio,
    url: 'http://apps.mprj.mp.br/sistema/dominio/#/',
  },
  {
    id: 'Painel-Compras-Covid-19',
    title: 'Painel Compras Covid-19',
    text: 'Compras públicas para enfrentamento da Covid-19.',
    img: LogoCovid,
    url:
      'https://tableau2020.mprj.mp.br/t/MPMAPAS/views/TESTE-COVID-19GATE/INCIO?:origin=card_share_link&:embed=n',
  },
  {
    id: 'Painel-Saneamento-Básico',
    title: 'Painel Saneamento Básico',
    text: 'Diagnóstico e indicadores de água, esgoto e drenagem por município.',
    img: LogoSaneamento,
    url:
      'https://geo.mprj.mp.br/portal/apps/experiencebuilder/experience/?id=35ae775b7f37418c9c65f47d62943d67',
  },
  {
    id: 'InLoco',
    title: 'InLoco',
    text: 'Mapa interativo com disponibilidade de várias camadas de dados georreferenciados.',
    img: LogoInLoco,
    url: 'http://inloco.mprj.mp.br/',
  },
];
export default ALTERNATIVE_SCREEN_DATA;
